import { Router } from "express";
import { setSize, updateAutomaton, createGrid } from "../controllers/automatonController";

const router = Router();

router.post("/setSize", setSize);
router.post("/update", updateAutomaton);
router.post("/create", createGrid);


export default router;
