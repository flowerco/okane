import React from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useAppDispatch } from "../../redux/hooks";
import { toggleDarkMode } from "../../redux/darkModeSlice";

export default function DarkModeButton() {
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useAppDispatch();

  return (
    <IconButton
      _hover={{ bg: "transparent" }}
      icon={
        colorMode === "light" ? (
          <MoonIcon width="1.5rem" height="1.5rem" color={"black"}/>
        ) : (
          <SunIcon width="1.5rem" height="1.5rem" />
        )
      }
      variant="ghost"
      onClick={() => {
        dispatch(toggleDarkMode("toggle!"));
        toggleColorMode();
      }}
      aria-label={""}
    />
  );
}
