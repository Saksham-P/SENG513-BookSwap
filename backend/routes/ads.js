//Create the express router
const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

//All Ad Controller functions
const {
  getAds,
  getAdminAds,
  getAd,
  createAd,
  deleteAd,
  updateAd,
  getAdsByUser,
  updateAdReports,
  deleteAdsByUser
} = require("../controllers/adController");

//Get all the Ads
router.get("/", getAds);

router.get("/getadminads", getAdminAds);

//Get a single Ad
router.get("/:id", getAd);

//Update an Ad
router.patch("/report/:id", updateAdReports);

//ALL THE FUNCTIONS AFTER THIS LINE OF CODE REQUIRE AUTHORIZATION
router.use(requireAuth);

//Post an Ad
router.post("/", createAd);

//Delete an Ad
router.delete("/:id", deleteAd);

//Delete an Ad
router.delete("/admin/:user_id", deleteAdsByUser);

//Update an Ad
router.patch("/:id", updateAd);

// Get all ads by a specific user
router.get("/user/:user_id", getAdsByUser);

//Export the router
module.exports = router;
