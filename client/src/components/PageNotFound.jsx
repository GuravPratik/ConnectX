import { useMoveBack } from "../hooks/useMoveBack";

function PageNotFound() {
  const moveBack = useMoveBack();
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="text-center">
        <h1 className="text-4xl font-semibold">404 - Page Not Found</h1>
        <p className="text-gray-400 my-1">
          The page you are looking for could not be found 😢
        </p>
        <button onClick={moveBack}>&larr; Go back</button>
      </div>
    </div>
  );
}

export default PageNotFound;
