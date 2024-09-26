import { Request, Response } from "express";
import { AutomatonService } from "../services/automatonService";

const automatonService =new AutomatonService() // Размер сетки 20x20
export const createGrid=(req: Request, res: Response) => {
  automatonService.create()
  res.json({
    status: true,
    grid: automatonService.getGrid()
  })
}

export const setSize = (req: Request, res: Response) => {
  const {width, height} = req.body.size
  automatonService.setSeizing(width, height)
  res.json(true);
};

export const updateAutomaton = (req: Request, res: Response) => {
  automatonService.applyRules();
  res.json(automatonService.getGrid());
};
