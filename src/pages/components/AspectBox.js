import { Box } from "@chakra-ui/react";

export default function AspectBox({ aspectRatio = 1, children, ...props }) {
  return (
    <Box {...props} position="relative">
      <Box
        pt={
          typeof aspectRatio === "number"
            ? `${(1 / aspectRatio) * 100}%`
            : undefined
        }
      ></Box>
      <Box position="absolute" top="0" right="0" bottom="0" left="0">
        {children}
      </Box>
    </Box>
  );
}
