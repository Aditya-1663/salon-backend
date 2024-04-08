const express = require("express");
const { body, validationResult } = require("express-validator");
const booking = require("../schema/Booking");
const availability1 = require("../schema/Availabilityschema");
const fetchuser = require("../middleware/fatchusers");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const router = express.Router();
const jwt_secret = "adityakumarisgoodBoy";

router.post(
  "/",
  fetchuser,
  [
    body('slot.start')
    .notEmpty()
    .withMessage('Start time is required')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
    .withMessage('Invalid start time format'),

  
    body('slot.end')
    .notEmpty()
    .withMessage('Start time is required')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
    .withMessage('Invalid start time format')

  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      const { date, slot } = req.body;
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const newdate = new Date(date);
      console.log(newdate);
      const data1 = await availability1.aggregate([
        {
          $match: { "availability.date": newdate },
        },
        {
          $project: {
            availability: {
              $filter: {
                input: "$availability",
                as: "avail",
                cond: {
                  $eq: ["$$avail.date", newdate],
                },
              },
            },
          },
        },
      ]);
      if (!data1) {
        return res.status(400).json("slot is not available");
      }
     

      const slotsWithCapacity = data1[0].availability[0].slots.filter(
        (slot1) => {
          return (
            slot1.maxCapacity > 0 &&
            slot1.start === slot.start &&
            slot1.end === slot.end
          );
        }
      );
   if(slotsWithCapacity.length==0){
    return res.status(400).json("slot not available ");
   }
        console.log(typeof slotsWithCapacity)
      if (!slotsWithCapacity[0].maxCapacity) {
        return res.status(400).json("slot not available");
      }

      const newvalue = slotsWithCapacity[0].maxCapacity - 1;
      const filter = {
        $and: [
          { "availability.date": date },
          {
            "availability.slots": {
              $elemMatch: {
                maxCapacity: { $gt: 0 },
                start: slot.start,
                end: slot.end,
              },
            },
          },
        ],
      };
      const arrayFilters = [
        { "outer.slots.maxCapacity": { $gt: 0 } },
        {
          "inner.maxCapacity": { $gt: 0 },
          "inner.start": slot.start,
          "inner.end": slot.end,
        },
      ];
      const update = {
        $set: {
          "availability.$[outer].slots.$[inner].maxCapacity": newvalue,
        },
      };
      const options = {
        arrayFilters: arrayFilters,
      };
      availability1
        .updateOne(filter, update, options)
        .then((updatedSlot) => {
          if (updatedSlot) {
            console.log("Slot updated successfully:", updatedSlot);
          } else {
            console.log(updatedSlot);
            console.log("Slot not found.");
          }
        })
        .catch((error) => {
          console.error("Error updating slot:", error);
          return res.status(400).json("error");
        });
      const book = new booking({ user: req.user.id, newdate, slot });
      const booked = await book.save();
      res.json(booked);
    } catch (error) {
      console.log(error);
    }
  }
);

// router to get All booked slots
router.get("/", async (req, res) => {
  try {
    const book = await booking.find({});
    res.json(book);
  } catch (error) {
    console.log(error);
  }
});

//router to get all users booked data 

router.get("/usersbooking", fetchuser, async (req, res) => {
  try {
    const book = await booking.find({ user: req.user.id });
    res.json(book);
  } catch (error) {
    console.log(error);
  }
});
//users slots deleted---------------------------------------------------------------------------
router.delete(
  "/deleteusersslot",
  fetchuser,
  [
    body('slot.start')
    .notEmpty()
    .withMessage('Start time is required')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
    .withMessage('Invalid start time format'),

  
    body('slot.end')
    .notEmpty()
    .withMessage('Start time is required')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
    .withMessage('Invalid start time format')

  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      const { date, slot } = req.body;
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const newdate = new Date(date);
      
      const data1 = await availability1.aggregate([
        {
          $match: { "availability.date": newdate },
        },
        {
          $project: {
            availability: {
              $filter: {
                input: "$availability",
                as: "avail",
                cond: {
                  $eq: ["$$avail.date", newdate],
                },
              },
            },
          },
        },
      ]);
      if (!data1) {
        return res.status(400).json("slot is not available");
      }
     

      const slotsWithCapacity = data1[0].availability[0].slots.filter(
        (slot1) => {
          return (
            
            slot1.start === slot.start &&
            slot1.end === slot.end
          );
        }
      );
   if(slotsWithCapacity.length==0){
    return res.status(400).json("slot not available ");
   }
        console.log(typeof slotsWithCapacity)
      if (!slotsWithCapacity[0].maxCapacity) {
        return res.status(400).json("slot not available");
      }

      const newvalue = slotsWithCapacity[0].maxCapacity + 1;
      const filter = {
        $and: [
          { "availability.date": date },
          {
            "availability.slots": {
              $elemMatch: {
                maxCapacity: { $gte: 0 },
                start: slot.start,
                end: slot.end,
              },
            },
          },
        ],
      };
      const arrayFilters = [
        { "outer.slots.maxCapacity": { $gte: 0 } },
        {
          "inner.maxCapacity": { $gte: 0 },
          "inner.start": slot.start,
          "inner.end": slot.end,
        },
      ];
      const update = {
        $set: {
          "availability.$[outer].slots.$[inner].maxCapacity": newvalue,
        },
      };
      const options = {
        arrayFilters: arrayFilters,
      };
      availability1
        .updateOne(filter, update, options)
        .then((updatedSlot) => {
          if (updatedSlot) {
            console.log("Slot updated successfully:", updatedSlot);
          } else {
            console.log(updatedSlot);
            console.log("Slot not found.");
          }
        })
        .catch((error) => {
          console.error("Error updating slot:", error);
          return res.status(400).json("error");
        });
      
     var book= await booking.findByIdAndDelete({user:req.user.id})
     
      res.json(book," slot deleted ");
    } catch (error) {
      console.log(error);
    }
  }
);


module.exports = router;
