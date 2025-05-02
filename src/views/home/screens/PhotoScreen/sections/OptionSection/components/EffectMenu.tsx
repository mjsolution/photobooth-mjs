import {
  Box,
  Button,
  Grid2,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  PhotoboothContext,
  PhotoFilter,
} from "@src/contexts/PhotoboothProvider";
import React, {
  Dispatch,
  FC,
  MouseEventHandler,
  SetStateAction,
  useContext,
} from "react";
import Webcam from "react-webcam";

type EffectMenuProps = {
  selectedMenu: string | null;
  setSelectedMenu: Dispatch<SetStateAction<string | null>>;
};

type PreviewProps = {
  selected: boolean;
  filter: PhotoFilter;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

const filters: PhotoFilter[] = [
  { id: 1, name: "None", value: "none" },
  { id: 2, name: "Brighten", value: "brightness(1.2) contrast(1.1)" },
  { id: 3, name: "Bright Boost", value: "brightness(1.5) contrast(1.2) saturate(1.1)" },
  { id: 4, name: "GlowUp", value: "brightness(1.1) saturate(1.3) contrast(1.05)" },
  { id: 5, name: "Old Film", value: "grayscale(0.3) sepia(0.4) contrast(1.2) saturate(0.8)" },
  { id: 6, name: "CyberPop", value: "contrast(1.4) saturate(1.5) hue-rotate(20deg)" },
  { id: 7, name: "Matte Cream", value: "brightness(1.1) contrast(0.9) sepia(0.2) saturate(0.8)" },
  { id: 8, name: "Dreamy", value: "blur(0.7px) brightness(1.4) saturate(1.2)" },
  { id: 9, name: "Sunset Vibe", value: "sepia(0.5) hue-rotate(-20deg) brightness(1.2)" },
];

const Preview: FC<PreviewProps> = ({ selected, filter, onClick }) => {
  return (
    <Stack
      sx={{
        outline: selected ? "1px solid white" : "none",
        outlineOffset: "4px",
      }}
      onClick={onClick}
    >
      <Webcam
        audio={false}
        mirrored
        videoConstraints={{ width: 164, height: 220 }}
        style={{ filter: filter.value, width: "164px", height: "220px" }}
      />

      <Typography textAlign="center" fontSize="24px" mt={2} color="white">
        {filter.name}
      </Typography>
    </Stack>
  );
};

const EffectMenu: FC<EffectMenuProps> = ({ setSelectedMenu }) => {
  const portrait = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("xl")
  );

  const { setSelectedFilter, selectedCurrentFilter, setSelectedCurrentFilter } =
    useContext(PhotoboothContext);

  return (
    <Box width="662px">
      <Box px={{ xl: "46px" }}>
        {!portrait && (
          <Grid2
            container
            columnSpacing="38px"
            rowSpacing="24px"
            height="400px"
            m="-4px"
            p={1}
            sx={{
              overflowY: "scroll",
              "&::-webkit-scrollbar": { display: "none" },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {filters.map((filter) => {
              const selected = filter.name === selectedCurrentFilter?.name;

              return (
                <Grid2
                  key={filter.id}
                  size={{ xs: "grow", xl: 4 }}
                  display="flex"
                  onClick={() => setSelectedCurrentFilter(filter)}
                >
                  <Preview
                    selected={selected}
                    filter={filter}
                    onClick={() => setSelectedCurrentFilter(filter)}
                  />
                </Grid2>
              );
            })}
          </Grid2>
        )}

        {portrait && (
          <Stack
            direction="row"
            spacing={5}
            sx={{
              overflowX: "scroll",
              "&::-webkit-scrollbar": { display: "none" },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
            m="-4px"
            p={1}
          >
            {filters.map((filter) => {
              const selected = filter.name === selectedCurrentFilter?.name;

              return (
                <Preview
                  key={filter.id}
                  selected={selected}
                  filter={filter}
                  onClick={() => setSelectedCurrentFilter(filter)}
                />
              );
            })}
          </Stack>
        )}

        <Stack direction="row" spacing={3} mt={3}>
          <Button
            variant="contained"
            color="Green200"
            size="large"
            fullWidth
            onClick={() => {
              setSelectedMenu(null);
              setSelectedCurrentFilter(null);
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="Green200"
            size="large"
            fullWidth
            onClick={() => {
              setSelectedFilter(selectedCurrentFilter);
              setSelectedMenu(null);
            }}
          >
            Apply
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default EffectMenu;
