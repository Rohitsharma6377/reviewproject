import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRating } from "../store/reducers/ratingSlice";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { Card, CardContent, Typography, LinearProgress, Box } from "@mui/material";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

// Function to generate color based on rating value
function getColor(value) {
  const red = Math.max(255 - (value / 5) * 255, 0);
  const green = Math.min((value / 5) * 255, 255);
  return `rgb(${red}, ${green}, 0)`;
}

export default function HoverRating() {
  const dispatch = useDispatch();
  const ratings = useSelector((state) => state.rating.ratings);
  const averageRating = useSelector((state) => state.rating.averageRating);
  const ratingCounts = useSelector((state) => state.rating.ratingCounts);

  const [hover, setHover] = React.useState(-1);

  return (
    <Card className="shadow-2xl border border-gray-200 rounded-xl p-6 w-[400px] bg-white">
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="flex items-center">
          <Rating
            name="hover-feedback"
            value={averageRating}
            precision={0.5} 
            size="large" 
            getLabelText={(value) => `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`}
            onChange={(event, newValue) => {
              dispatch(addRating(newValue));
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            icon={
              <StarIcon
                className="transition-colors duration-300"
                style={{
                  color: getColor(hover !== -1 ? hover : averageRating),
                  fontSize: "2rem",
                }}
              />
            }
            emptyIcon={
              <StarIcon
                style={{ opacity: 0.3, fontSize: "2rem" }} 
              />
            }
          />
          {averageRating > 0 && (
            <Typography
              variant="body2"
              className="ml-3 font-semibold text-gray-800"
              style={{ color: getColor(hover !== -1 ? hover : averageRating) }}
            >
              {labels[hover !== -1 ? hover : averageRating]}
            </Typography>
          )}
        </div>

        <Typography
          variant="h6"
          className="text-lg font-semibold text-center"
          style={{ color: getColor(hover !== -1 ? hover : averageRating) }}
        >
          {ratings.length > 0
            ? `Average Rating: ${averageRating.toFixed(1)} ⭐ (${ratings.length} votes)`
            : "No ratings yet"}
        </Typography>

        <Box className="w-full space-y-3">
          {Object.keys(ratingCounts)
            .reverse()
            .map((star) => (
              <div key={star} className="flex items-center">
                <Typography className="text-sm font-medium text-gray-700 w-8">{star} ⭐</Typography>
                <LinearProgress
                  variant="determinate"
                  value={ratings.length > 0 ? (ratingCounts[star] / ratings.length) * 100 : 0}
                  className="flex-1 h-3 rounded-lg overflow-hidden"
                  sx={{
                    "& .MuiLinearProgress-bar": {
                      background: "linear-gradient(to right, #ff8c00, #ffd700)", // More beautiful gradient
                    },
                    backgroundColor: "#f3f4f6", // Lighter gray background
                  }}
                />
                <Typography className="ml-2 text-xs text-gray-600">{ratingCounts[star]} votes</Typography>
              </div>
            ))}
        </Box>
      </CardContent>
    </Card>
  );
}
