import CreateNewLens from "../../_components/lens/CreateNewLens";
import LensCategories from "../../_components/lens/LensCategories";
import LensType from "../../_components/lens/LensType";
import RefractiveIndex from "../../_components/lens/RefractiveIndex";

export default function CreateLens() {
  return (
    <>
      <CreateNewLens />
      <RefractiveIndex />
      <LensType />
      <LensCategories />
    </>
  );
}
