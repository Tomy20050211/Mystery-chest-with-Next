import { NextResponse } from "next/server";
import { arrayCards } from "../../../data/cards";

export function GET() {
  return NextResponse.json(arrayCards);
}
