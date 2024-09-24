import { Request, Response } from "express";
import { AutomatonService } from "../services/automatonService";

const automatonService =new AutomatonService() // Размер сетки 20x20
export const createGrid=(req: Request, res: Response) => {
  automatonService.create()
  res.json(automatonService.getGrid())
}

export const setSize = (req: Request, res: Response) => {
  automatonService.setSeizing(req.body.width, req.body.height)
  res.json(true);
};

export const updateAutomaton = (req: Request, res: Response) => {
  automatonService.applyRules();
  res.json(automatonService.getGrid());
};
