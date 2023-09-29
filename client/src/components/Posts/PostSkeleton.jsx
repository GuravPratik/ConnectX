import { Box, Skeleton, Stack } from "@mui/material";

function PostSkeleton() {
  return (
    <div>
      <Stack spacing={1}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Skeleton
            animation="wave"
            variant="circular"
            width={42}
            height={42}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ fontSize: "1rem", width: "100%" }}
            />
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ fontSize: "1rem", width: "100%" }}
            />
          </Box>
        </Box>
        <Skeleton animation="wave" variant="rounded" width={400} height={250} />
      </Stack>
    </div>
  );
}

export default PostSkeleton;
