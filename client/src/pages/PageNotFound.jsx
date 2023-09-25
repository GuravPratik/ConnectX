import Link from "@mui/material/Link";
import { useMoveBack } from "../hooks/useMoveBack";

function PageNotFound() {
  const moveBack = useMoveBack();
  return (
    <div>
      <div>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for could not be found 😢</p>
        <Link
          onClick={moveBack}
          variant="body2"
          underline="hover"
          component="button"
          sx={{
            color: "#7986cb",
          }}
        >
          &larr; Go back
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
