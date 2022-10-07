const express = require("express")
const { protectRoute } = require("../middleware/authMiddleware")

const {
  registerPatient,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient,
  getCheckedInPatients,
} = require("../controllers/patientController")

const router = express.Router()

router.post("/", protectRoute, registerPatient)
router.get("/", protectRoute, getPatients)
router.get("/checked-in", protectRoute, getCheckedInPatients)
router.get("/:id", protectRoute, getPatient)
router.put("/:id", protectRoute, updatePatient)
router.delete("/:id", protectRoute, deletePatient)

module.exports = router
