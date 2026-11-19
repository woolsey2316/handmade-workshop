"""
Seed Post rows from the frontend blog catalog (frontend/lib/blog.ts).

Usage (from backend/):
    python manage.py seed_posts
    python manage.py seed_posts --clear
"""

from __future__ import annotations

import shutil
from datetime import datetime
from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils import timezone
from django.utils.text import slugify

from api.models import Category, CustomUser, Post

STANDARD_BODY = [
    {
        "type": "paragraph",
        "text": (
            "In a professional context it often happens that private or corporate "
            "clients order a publication to be made and presented with the actual "
            "content still not being ready. Think of a news blog that's filled with "
            "content hourly on the day of going live. However, reviewers tend to be "
            "distracted by comprehensible content, say, a random text copied "
            "newspaper or the internet. They are to focus on the text, disregarding "
            "the layout and its elements. Besides, random text risks to be "
            "unintendedly humorous or offensive, an unacceptable risk in corporate "
            "environments."
        ),
    },
    {
        "type": "paragraph",
        "text": (
            "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, "
            "consectetur, adipisci velit, sed quia non numquam eius modi tempora "
            "incidunt ut labore et dolore magnam aliquam quaerat voluptatem. "
            "Aenean commodo ligula eget dolor aenean massa. Cum sociis natoque "
            "penatibus et magnis dis parturient montes, nascetur ridiculus mus. "
            "Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. "
            "Nulla consequat massa quis enim. Donec vitae sapien ut libero "
            "venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros "
            "faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. "
            "Donec sodales sagittis magna. Aenean commodo ligula eget dolor aenean "
            "massa. Sed ut perspiciatis unde omnis iste natus error sit voluptatem "
            "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae "
            "ab illo inventore veritatis et quasi architecto beatae vitae dicta "
            "sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit "
            "aspernatur aut odit aut fugit, sed quia consequuntur magni dolores "
            "eos qui ratione voluptatem sequi nesciunt."
        ),
    },
    {
        "type": "heading",
        "text": "What we will do? It is for you",
    },
    {
        "type": "paragraph",
        "text": (
            "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, "
            "consectetur, adipisci velit, sed quia non numquam eius modi tempora "
            "incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut "
            "enim ad minima veniam, quis nostrum exercitationem ullam corporis "
            "suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Nam "
            "libero tempore, cum soluta nobis est eligendi optio cumque nihil "
            "impedit quo minus id quod maxime placeat facere possimus, omnis "
            "voluptas assumenda est, omnis dolor repellendus. Temporibus autem "
            "quibusdam et aut officiis debitis aut rerum necessitatibus saepe "
            "eveniet ut et voluptates repudiandae sint et molestiae non "
            "recusandae."
        ),
    },
    {
        "type": "quote",
        "text": (
            "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, "
            "consectetur, adipisci velit, sed quia non numquam eius modi tempora "
            "incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
        ),
    },
    {
        "type": "paragraph",
        "text": (
            "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, "
            "consectetur, adipisci velit, sed quia non numquam eius modi tempora "
            "incidunt ut labore et dolore magnam aliquam quaerat voluptatem. "
            "Aenean commodo ligula eget dolor aenean massa. Cum sociis natoque "
            "penatibus et magnis dis parturient montes, nascetur ridiculus mus. "
            "Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. "
            "Nulla consequat massa quis enim. Donec vitae sapien ut libero "
            "venenatis faucibus. Nulla consequat massa quis enim."
        ),
    },
]

# Mirrors frontend/lib/blog.ts blogPosts (after withDefaults).
POSTS = [
    {
        "title": "Video Post",
        "date": "April 9, 2016",
        "author": "g5plusacc",
        "categories": ["Uncategorized"],
        "comments": 0,
        "excerpt": (
            "In a professional context it often happens that private or corporate "
            "clients order a publication to be made and presented with the actual "
            "content still not being ready. Think of a news blog that's filled "
            "with content hourly on the day of going live. However, reviewers "
            "tend to be distracted by comprehensible content, say, a…"
        ),
        "image": "banner-2.jpg",
    },
    {
        "title": "I Love My Life Very Much",
        "date": "August 2, 2015",
        "author": "g5plusacc",
        "categories": ["Food", "Nature"],
        "comments": 0,
        "excerpt": (
            "In a professional context it often happens that private or corporate "
            "clients order a publication to be made and presented with the actual "
            "content still not being ready. Think of a news blog that's filled "
            "with content hourly on the day of going live. However, reviewers "
            "tend to be distracted by comprehensible content, say, a…"
        ),
        "image": "banner-3.jpg",
    },
    {
        "title": "Here Are Many Variations Of Passages",
        "date": "August 2, 2015",
        "author": "g5plusacc",
        "categories": ["Destination", "Photography"],
        "comments": 0,
        "excerpt": (
            "In a professional context it often happens that private or corporate "
            "clients order a publication to be made and presented with the actual "
            "content still not being ready. Think of a news blog that's filled "
            "with content hourly on the day of going live. However, reviewers "
            "tend to be distracted by comprehensible content, say, a…"
        ),
        "image": "banner-4.jpg",
    },
    {
        "title": "Intelligent Transitions In Ux Design",
        "date": "August 2, 2015",
        "author": "g5plusacc",
        "categories": ["Landscape", "Travel"],
        "comments": 0,
        "excerpt": (
            "In a professional context it often happens that private or corporate "
            "clients order a publication to be made and presented with the actual "
            "content still not being ready. Think of a news blog that's filled "
            "with content hourly on the day of going live. However, reviewers "
            "tend to be distracted by comprehensible content, say, a…"
        ),
        "image": "banner-11.jpg",
    },
    {
        "title": "Standard Post Example",
        "date": "July 14, 2015",
        "author": "g5plusacc",
        "categories": ["Destination", "Nature"],
        "comments": 0,
        "excerpt": (
            "In a professional context it often happens that private or corporate "
            "clients order a publication to be made and presented with the actual "
            "content still not being ready. Think of a news blog that's filled "
            "with content hourly on the day of going live. However, reviewers "
            "tend to be distracted by comprehensible content, say, a…"
        ),
        "image": "product-01-570x570.jpg",
    },
    {
        "title": "Image Post Example",
        "date": "June 1, 2015",
        "author": "g5plusacc",
        "categories": ["Food", "Landscape"],
        "comments": 0,
        "excerpt": (
            "In a professional context it often happens that private or corporate "
            "clients order a publication to be made and presented with the actual "
            "content still not being ready. Think of a news blog that's filled "
            "with content hourly on the day of going live. However, reviewers "
            "tend to be distracted by comprehensible content, say, a…"
        ),
        "image": "banner2.jpg",
    },
    {
        "title": "Gallery Post Example",
        "date": "May 19, 2015",
        "author": "g5plusacc",
        "categories": ["Photography", "Travel"],
        "comments": 0,
        "excerpt": (
            "In a professional context it often happens that private or corporate "
            "clients order a publication to be made and presented with the actual "
            "content still not being ready. Think of a news blog that's filled "
            "with content hourly on the day of going live. However, reviewers "
            "tend to be distracted by comprehensible content, say, a…"
        ),
        "image": "banner-home-1.jpg",
    },
    {
        "title": "Amazing Youtube Video Post",
        "date": "April 11, 2015",
        "author": "g5plusacc",
        "categories": ["Destination", "Travel"],
        "comments": 0,
        "excerpt": (
            "In a professional context it often happens that private or corporate "
            "clients order a publication to be made and presented with the actual "
            "content still not being ready. Think of a news blog that's filled "
            "with content hourly on the day of going live. However, reviewers "
            "tend to be distracted by comprehensible content, say, a…"
        ),
        "image": "product-17-570x570.jpg",
    },
    {
        "title": "Incredible Audio Player Post",
        "date": "March 23, 2015",
        "author": "g5plusacc",
        "categories": ["Food", "Photography"],
        "comments": 0,
        "excerpt": (
            "In a professional context it often happens that private or corporate "
            "clients order a publication to be made and presented with the actual "
            "content still not being ready. Think of a news blog that's filled "
            "with content hourly on the day of going live. However, reviewers "
            "tend to be distracted by comprehensible content, say, a…"
        ),
        "image": "product-11-570x570.jpg",
    },
    {
        "title": "Quote Post Example",
        "date": "February 15, 2015",
        "author": "g5plusacc",
        "categories": ["Landscape", "Travel"],
        "comments": 0,
        "excerpt": "",
        "image": "banner-31.jpg",
        "quote": {
            "text": (
                "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, "
                "consectetur, adipisci velit, sed quia non numquam eius modi "
                "tempora incidunt ut labore et dolore magnam aliquam quaerat "
                "voluptatem."
            ),
            "author": "Oscar Wilde",
        },
    },
]

BLOG_CATEGORIES = [
    "Destination",
    "Food",
    "Landscape",
    "Nature",
    "Photography",
    "Travel",
    "Uncategorized",
]


def _frontend_public_dir() -> Path:
    # backend/api/management/commands/seed_posts.py → repo root
    return Path(__file__).resolve().parents[4] / "frontend" / "public"


def _copy_image(filename: str) -> str | None:
    """Copy image from frontend/public into MEDIA_ROOT/posts/ and return relative path."""
    if not filename:
        return None

    source = _frontend_public_dir() / filename.lstrip("/")
    if not source.is_file():
        return None

    dest_dir = Path(settings.MEDIA_ROOT) / "posts"
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest = dest_dir / source.name
    if not dest.exists():
        shutil.copy2(source, dest)
    return f"posts/{source.name}"


def _render_content(item: dict) -> str:
    parts: list[str] = []
    excerpt = (item.get("excerpt") or "").strip()
    if excerpt:
        parts.append(excerpt)

    quote = item.get("quote")
    if quote:
        parts.append(f"> {quote['text']}\n— {quote['author']}")

    for block in STANDARD_BODY:
        kind = block["type"]
        text = block["text"]
        if kind == "heading":
            parts.append(f"## {text}")
        elif kind == "quote":
            parts.append(f"> {text}")
        else:
            parts.append(text)

    return "\n\n".join(parts)


def _parse_date(value: str):
    naive = datetime.strptime(value, "%B %d, %Y")
    if settings.USE_TZ:
        return timezone.make_aware(naive, timezone.get_default_timezone())
    return naive


def _get_or_create_author(username: str) -> CustomUser:
    email = f"{username.lower()}@example.com"
    user, created = CustomUser.objects.get_or_create(
        email=email,
        defaults={
            "first_name": username,
            "last_name": "",
            "is_active": True,
        },
    )
    if created:
        user.set_unusable_password()
        user.save(update_fields=["password"])
    return user


class Command(BaseCommand):
    help = "Insert blog posts from the frontend catalog into the database."

    def add_arguments(self, parser):
        parser.add_argument(
            "--clear",
            action="store_true",
            help="Delete existing posts before seeding (categories are kept).",
        )

    @transaction.atomic
    def handle(self, *args, **options):
        if options["clear"]:
            deleted, _ = Post.objects.all().delete()
            self.stdout.write(self.style.WARNING(f"Cleared {deleted} posts."))

        category_map: dict[str, Category] = {}
        for name in BLOG_CATEGORIES:
            category, created = Category.objects.get_or_create(name=name)
            category_map[name] = category
            action = "Created" if created else "Found"
            self.stdout.write(f"  {action} category: {name}")

        created_count = 0
        updated_count = 0
        skipped_images: list[str] = []

        for item in POSTS:
            author = _get_or_create_author(item["author"])
            slug = slugify(item["title"])
            image_path = _copy_image(item.get("image", ""))
            if item.get("image") and not image_path:
                skipped_images.append(item["image"])

            # blog.ts withDefaults: tags default to categories when omitted.
            tags = list(item.get("tags") or item["categories"])

            post, created = Post.objects.update_or_create(
                slug=slug,
                defaults={
                    "title": item["title"],
                    "content": _render_content(item),
                    "author": author,
                    "comments": item.get("comments", 0),
                    "tags": tags,
                },
            )

            if image_path:
                post.image.name = image_path
                post.save(update_fields=["image"])

            post.categories.set(
                [category_map[name] for name in item["categories"] if name in category_map]
            )

            # Preserve catalog publish dates (auto_now_add would ignore create kwargs).
            Post.objects.filter(pk=post.pk).update(created_at=_parse_date(item["date"]))

            if created:
                created_count += 1
                self.stdout.write(self.style.SUCCESS(f"  Created post: {post.title}"))
            else:
                updated_count += 1
                self.stdout.write(f"  Updated post: {post.title}")

        self.stdout.write("")
        self.stdout.write(
            self.style.SUCCESS(
                f"Done. Created {created_count}, updated {updated_count}, "
                f"total posts {Post.objects.count()}."
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
