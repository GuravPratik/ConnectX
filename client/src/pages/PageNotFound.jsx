import { useMoveBack } from "../hooks/useMoveBack";

function PageNotFound() {
  const moveBack = useMoveBack();
  return (
    <div>
      <div>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for could not be found 😢</p>
        <button onClick={moveBack}>&larr; Go back</button>
      </div>
    </div>
  );
}

export default PageNotFound;
