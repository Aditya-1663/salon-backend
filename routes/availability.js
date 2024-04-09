const express = require("express");
const { body, validationResult } = require("express-validator");
const availability1 = require("../schema/Availabilityschema");
const router = express.Router();

router.post(
  "/",[
    body('availability.*.slots.*.start')
    .notEmpty()
    .withMessage('Start time is required')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
    .withMessage('Invalid start time format'),

  
    body('availability.*.slots.*.end')
    .notEmpty()
    .withMessage('Start time is required')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
    .withMessage('Invalid start time format')

  ],

  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      const newData = new availability1(req.body);

      const h = newData.save().then((savedData) => {
        res.json({ success, savedData });
      });

      success = true;
      
    } catch (err) {
      console.log(err);
    }
  }
);

// available-slots
router.get(
  "/:date",

  async (req, res) => {
    let success = false;
    try {
      const date = new Date(req.params.date);

      const data1 = await availability1.aggregate([
        {
          $match: {
            "availability.date": date,
            "availability.slots.maxCapacity": { $gt: 0 },
          },
        },
        {
          $project: {
            availability: {
              $filter: {
                input: "$availability",
                as: "avail",
                cond: {
                  $and: [
                    { $eq: ["$$avail.date", date] },
                    { $ne: [{ $size: "$$avail.slots.maxCapacity" }, 0] },
                  ],
                },
              },
            },
          },
        },
      ]);
      
if (data1.length === 0) {
  
 return res.status(400).json("No data found for date1:");
} 

      var slotsWithCapacity = data1[0].availability[0].slots.filter(
        (slot) => slot.maxCapacity > 0
      );
      res.json(slotsWithCapacity);
    } catch (error) {
      console.log(error);
    }
  }
);
// available-slots
router.delete(
  "/:date",

  async (req, res) => {
    let success = false;
    try {
      const date = new Date(req.params.date);
   const data=await availability1.findOneAndDelete({ "availability.date": date})
      if(data==null){
        return res.status(400).json("no data found to be delete" );
      }
      res.json("data is deleted");
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
