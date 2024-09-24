import { Request, Response } from "express";
import { AutomatonService } from "../services/automatonService";

const automatonService = {
  instance: new AutomatonService(90, 190),
  update: ()=>{
    console.log("update automaton controller");
    // @ts-ignore
    this.instance=new AutomatonService(90, 190);
  }
}; // Размер сетки 20x20

export const getGrid = (req: Request, res: Response) => {
  console.log('getGrid')
  res.json(automatonService.instance.getGrid());
};

export const updateAutomaton = (req: Request, res: Response) => {
  automatonService.instance.applyRules();
  res.json(automatonService.instance.getGrid());
};
export const reset =(req: Request, res: Response) => {
  automatonService.instance.reset()
  res.json(automatonService.instance.getGrid());
}
