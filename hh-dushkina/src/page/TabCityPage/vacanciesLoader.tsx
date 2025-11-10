import type { LoaderFunction } from "react-router-dom";
import { store } from "../../store/store";
import { setArea } from "../../store/reducers/vacanciesSlice";
import { fetchVacancies } from "../../store/reducers/vacanciesThunk";
import { unwrapResult } from "@reduxjs/toolkit";

const CITY_TO_AREA_ID: Record<string, string> = {
  moscow: "1",       
  petersburg: "2",  
}

export const vacanciesLoader: LoaderFunction = async ({ params }) => {
  const slug = (params?.city as string) || "moscow";
  const areaId = CITY_TO_AREA_ID[slug] ?? CITY_TO_AREA_ID["moscow"];
  store.dispatch(setArea(areaId));
  const actionResult = await store.dispatch(fetchVacancies());

  try {
    const payload = unwrapResult(actionResult);
    return { city: slug, area: areaId, payload };
  } catch (err: unknown) {

    const message =
      err instanceof Error ? err.message : (typeof err === "string" ? err : "Failed to load vacancies");
    throw new Response(String(message), { status: 500 });
  }
};