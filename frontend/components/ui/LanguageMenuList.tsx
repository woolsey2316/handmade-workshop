import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import Image from 'next/image'
import { Language, AppLanguage } from '@/types/languages'
import { OptionalMenuItem } from '@/components/ui/MenuItem'

export default function MenuListComposition() {
  const [open, setOpen] = React.useState(false);
  const [language, setLanguage] = React.useState<keyof typeof Language>('en')
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const languagesMap = Object.entries(Language) as [keyof typeof Language, typeof Language[keyof typeof Language]][];

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open}
          aria-haspopup="true"
          onClick={handleToggle}
          sx={{ textTransform: 'none' }}
        >
          <div className="inline-flex items-center gap-1.5 hover:text-ink text-xs">
            <Image src={`/${language}.png`} alt="selected language flag" width={16} height={11} />
            {Language[language]}
          </div>
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {languagesMap.map(([id, value]) => (
                      <OptionalMenuItem
                        key={id}
                        currOption={Language[language]}
                        thisOption={value}
                        menuName={value}
                        imageProps={<Image src={`/${id}.png`} alt="flag" width={16} height={11} />}
                        handleClick={(event) => { handleClose(event); setLanguage(id) }}
                      />
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}
