import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRatingToDB, fetchRatings } from "../store/reducers/ratingSlice";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const labels = {
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

// Function color gradient from red (bad) to green (good)
function getColor(value) {
  const red = Math.max(255 - (value / 5) * 255, 0);
  const green = Math.min((value / 5) * 255, 255);
  return `rgb(${red}, ${green}, 0)`;
}

export default function HoverRating() {
  const dispatch = useDispatch();
  const { ratings, averageRating, ratingCounts } = useSelector((state) => state.rating);
  const [hover, setHover] = useState(-1);
  const [currentRating, setCurrentRating] = useState(averageRating || 0);

  useEffect(() => {
    dispatch(fetchRatings());
  }, [dispatch]);

  useEffect(() => {
    setCurrentRating(averageRating || 0);
  }, [averageRating]);

  const handleRating = (newValue) => {
    if (newValue) {
      dispatch(addRatingToDB(newValue)).then(() => {
        dispatch(fetchRatings());
        toast.success(`You rated ${newValue.toFixed(1)} stars!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      });
    }
  };

  return (
    <Card className="shadow-2xl border rounded-xl w-[600px] bg-gradient-to-tr bg-gray-200">
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="flex items-center">
          <Rating
            name="hover-feedback"
            value={currentRating}
            precision={0.1}
            size="large"
            getLabelText={(value) => `${value} Star${value !== 1 ? "s" : ""}, ${labels[Math.round(value)]}`}
            onChange={(event, newValue) => handleRating(newValue)}
            onChangeActive={(event, newHover) => setHover(newHover)}
            icon={
              <StarIcon
                className="transition-colors duration-300"
                style={{
                  color: getColor(hover !== -1 ? hover : currentRating),
                  fontSize: "3rem",
                }}
              />
            }
            emptyIcon={<StarIcon style={{ opacity: 0.3, fontSize: "3rem" }} />}
          />
          {ratings.length > 0 && (
            <Typography
              variant="h6"
              className="text-lg font-semibold text-center ml-12"
              style={{ color: getColor(hover !== -1 ? hover : currentRating) }}
            >
              {ratings.length > 0
                ? `Avg: ${Number(averageRating || 0).toFixed(1)} ⭐ (${ratings.length} votes)`
                : "No ratings yet"}
            </Typography>
          )}
        </div>

        <Box className="w-full space-y-3 flex flex-col items-center">
          {[5, 4, 3, 2, 1].map((star) => {
            const filledStars = (ratingCounts[star] || 0).toFixed(1);
            return (
              <div key={star} className="flex items-center space-x-2">
                <Typography className="text-2xl font-bold text-black space-x-2 px-6">{filledStars}</Typography>
                <Box className="flex relative">
                  <Rating
                    value={star}
                    precision={0.1}
                    readOnly
                    icon={<StarIcon style={{ fontSize: "3rem", color: getColor(star) }} />}
                    emptyIcon={<StarIcon style={{ fontSize: "3rem", opacity: 0.3 }} />}
                  />
                </Box>
              </div>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}
