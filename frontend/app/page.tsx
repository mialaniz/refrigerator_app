import Image from "next/image";
import { Button } from "../components/Button"
import { Paper, Typography } from "@mui/material";
import fridge from "../public/fridge.jpg"

export default function Home() {
  return (
    <div className="flex flex-col items-center pt-56">
      <Paper className="flex w-96 h-96 justify-center">
        <Image src={fridge} alt="hello" width={500} height={500} />
      </Paper>
      <div className="mt-4">
        <Button />
      </div>
    </div>
  );
}