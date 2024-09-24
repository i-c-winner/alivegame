import { Router } from "express";
import { getGrid, updateAutomaton, reset } from "../controllers/automatonController";

const router = Router();

router.get("/grid", getGrid);
router.post("/update", updateAutomaton);
router.get('/reset', reset)

export default router;
