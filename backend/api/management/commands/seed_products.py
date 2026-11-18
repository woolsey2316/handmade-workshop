"""
Seed Category and Product rows from the frontend catalog
(frontend/lib/products.ts).

Usage (from backend/):
    python manage.py seed_products
    python manage.py seed_products --clear
"""

from __future__ import annotations

import shutil
from decimal import Decimal
from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand
from django.db import transaction

from api.models import Category, Product

# Mirrors frontend/lib/products.ts — unique products by name (shopProducts).
PRODUCTS = [
    {
        "name": "Birthday Gifts Grouped",
        "price": "35.00",
        "image": "product-01-570x570.jpg",
        "category": "Birthday Gifts",
    },
    {
        "name": "Yellow Pillow",
        "price": "40.00",
        "image": "product-03-570x570.jpg",
        "category": "Personal",
    },
    {
        "name": "Bracelets With Names",
        "price": "40.00",
        "sale_price": "35.00",
        "image": "product-05-570x570.jpg",
        "category": "Special Goods",
    },
    {
        "name": "Knit Handmade Bracelets",
        "price": "40.00",
        "image": "product-08-570x570.jpg",
        "category": "Birthday Gifts",
    },
    {
        "name": "Colorful Bracelet",
        "price": "40.00",
        "image": "product-12-570x570.jpg",
        "category": "Personal",
    },
    {
        "name": "Knit From Wool Bracelets",
        "price": "40.00",
        "sale_price": "30.00",
        "image": "product-13-570x570.jpg",
        "category": "Special Goods",
    },
    {
        "name": "Friendship Bracelets",
        "price": "40.00",
        "price_max": "45.00",
        "image": "product-14-570x570.jpg",
        "category": "Birthday Gifts",
    },
    {
        "name": "Flower Bending",
        "price": "35.00",
        "image": "product-15-570x570.jpg",
        "category": "Special Goods",
    },
    {
        "name": "Wool Knit Scarf-Coat",
        "price": "45.00",
        "sale_price": "40.00",
        "image": "product-17-570x570.jpg",
        "category": "Personal",
    },
    {
        "name": "Funny Wool Basket",
        "price": "40.00",
        "sale_price": "30.00",
        "image": "product-18-570x570.jpg",
        "category": "Personal",
    },
    {
        "name": "Greeting Cards",
        "price": "14.00",
        "price_max": "15.00",
        "image": "product-11-570x570.jpg",
        "category": "Special Goods",
    },
    {
        "name": "Handmade Paper Stars",
        "price": "45.00",
        "image": "product-21-570x570.jpg",
        "category": "Special Goods",
    },
    {
        "name": "Shaking Wrist",
        "price": "40.00",
        "image": "product-09-300x300.jpg",
        "category": "Special Goods",
    },
    {
        "name": "Basket Of Wool",
        "price": "40.00",
        "image": "product-01-570x570.jpg",
        "category": "Personal",
    },
    {
        "name": "Birthday Greeting Cards",
        "price": "40.00",
        "sale_price": "35.00",
        "image": "product-11-570x570.jpg",
        "category": "Birthday Gifts",
    },
    {
        "name": "Earrings",
        "price": "40.00",
        "image": "product-05-570x570.jpg",
        "category": "Jewelry",
    },
    {
        "name": "Gift Box Logo",
        "price": "40.00",
        "image": "product-21-570x570.jpg",
        "category": "Birthday Gifts",
    },
    {
        "name": "Gift Boxes",
        "price": "40.00",
        "image": "banner-11.jpg",
        "category": "Birthday Gifts",
    },
    {
        "name": "Glowing Greeting Card",
        "price": "35.00",
        "image": "product-11-300x300.jpg",
        "category": "Special Goods",
    },
    {
        "name": "Hearts Made Of Cotton",
        "price": "40.00",
        "image": "banner-11.jpg",
        "category": "Personal",
    },
]

CATEGORIES = [
    "Birthday Gifts",
    "Every Day",
    "Greeting Cards",
    "Illumination",
    "Jewelry",
    "Love",
    "Personal",
    "Romantic",
    "Special Goods",
    "Uncategorized",
]


def _frontend_public_dir() -> Path:
    # backend/api/management/commands/seed_products.py → repo root
    return Path(__file__).resolve().parents[4] / "frontend" / "public"


def _copy_image(filename: str) -> str | None:
    """Copy image from frontend/public into MEDIA_ROOT/products/ and return relative path."""
    if not filename:
        return None

    source = _frontend_public_dir() / filename.lstrip("/")
    if not source.is_file():
        return None

    dest_dir = Path(settings.MEDIA_ROOT) / "products"
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest = dest_dir / source.name
    if not dest.exists():
        shutil.copy2(source, dest)
    return f"products/{source.name}"


class Command(BaseCommand):
    help = "Insert categories and products from the frontend catalog into the database."

    def add_arguments(self, parser):
        parser.add_argument(
            "--clear",
            action="store_true",
            help="Delete existing products (and unused categories) before seeding.",
        )

    @transaction.atomic
    def handle(self, *args, **options):
        if options["clear"]:
            deleted_products, _ = Product.objects.all().delete()
            deleted_categories, _ = Category.objects.all().delete()
            self.stdout.write(
                self.style.WARNING(
                    f"Cleared {deleted_products} products and {deleted_categories} categories."
                )
            )

        category_map: dict[str, Category] = {}
        for name in CATEGORIES:
            category, created = Category.objects.get_or_create(name=name)
            category_map[name] = category
            action = "Created" if created else "Found"
            self.stdout.write(f"  {action} category: {name}")

        created_count = 0
        updated_count = 0
        skipped_images: list[str] = []

        for item in PRODUCTS:
            category = category_map[item["category"]]
            image_path = _copy_image(item.get("image", ""))
            if item.get("image") and not image_path:
                skipped_images.append(item["image"])

            defaults = {
                "description": "",
                "price": Decimal(item["price"]),
                "sale_price": (
                    Decimal(item["sale_price"]) if item.get("sale_price") else None
                ),
                "price_max": (
                    Decimal(item["price_max"]) if item.get("price_max") else None
                ),
                "category": category,
            }

            product, created = Product.objects.update_or_create(
                name=item["name"],
                defaults=defaults,
            )

            if image_path:
                # Assign relative media path without re-uploading through the form.
                product.image.name = image_path
                product.save(update_fields=["image"])

            if created:
                created_count += 1
                self.stdout.write(self.style.SUCCESS(f"  Created product: {product.name}"))
            else:
                updated_count += 1
                self.stdout.write(f"  Updated product: {product.name}")

        self.stdout.write("")
        self.stdout.write(
            self.style.SUCCESS(
                f"Done. Created {created_count}, updated {updated_count}, "
                f"total catalog {Product.objects.count()}."
            )
        )
        if skipped_images:
            unique_missing = sorted(set(skipped_images))
            self.stdout.write(
                self.style.WARNING(
                    "Missing image files in frontend/public: "
                    + ", ".join(unique_missing)
                )
            )
