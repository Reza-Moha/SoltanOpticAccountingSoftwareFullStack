import CreateNewLens from "../../_components/lens/CreateNewLens";
import LensCategories from "../../_components/lens/LensCategories";
import LensPricing from "../../_components/lens/LensPricing";
import LensType from "../../_components/lens/LensType";
import RefractiveIndex from "../../_components/lens/RefractiveIndex";

export default function CreateLens() {
  return (
    <>
      <CreateNewLens />
      <LensPricing />
      <RefractiveIndex />
      <LensType />
      <LensCategories />
    </>
  );
}
