import { Router } from "express";
import { setSize, updateAutomaton, createGrid } from "../controllers/automatonController";

const router = Router();

router.post("/setsize", setSize);
router.get("/update", updateAutomaton);
router.get("/create", createGrid);


export default router;
