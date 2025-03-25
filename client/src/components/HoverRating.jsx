import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRatingToDB, fetchRatings } from "../store/reducers/ratingSlice";
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

function getColor(value) {
  const red = Math.max(255 - (value / 5) * 255, 0);
  const green = Math.min((value / 5) * 255, 255);
  return `rgb(${red}, ${green}, 0)`;
}

export default function HoverRating() {
  const dispatch = useDispatch();
  const { ratings, averageRating, ratingCounts } = useSelector((state) => state.rating);

  const [hover, setHover] = React.useState(-1);

  React.useEffect(() => {
    dispatch(fetchRatings());
  }, [dispatch]);

  const handleRating = (newValue) => {
    if (newValue) {
      dispatch(addRatingToDB(newValue)).then(() => {
        dispatch(fetchRatings()); // Refresh ratings after submission
      });
    }
  };

  return (
    <Card className="shadow-2xl border rounded-xl p-6 w-[400px] bg-black">
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="flex items-center">
          <Rating
            name="hover-feedback"
            value={averageRating}
            precision={0.5}
            size="large"
            getLabelText={(value) => `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`}
            onChange={(event, newValue) => handleRating(newValue)}
            onChangeActive={(event, newHover) => setHover(newHover)}
            icon={
              <StarIcon
                className="transition-colors duration-300"
                style={{
                  color: getColor(hover !== -1 ? hover : averageRating),
                  fontSize: "2rem",
                }}
              />
            }
            emptyIcon={<StarIcon style={{ opacity: 0.3, fontSize: "2rem" }} />}
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
            ? `Average Rating: ${averageRating.toFixed(1)} stars (${ratings.length} votes)`
            : "No ratings yet"}
        </Typography>

        <Box className="w-full space-y-3">
          {Object.keys(ratingCounts)
            .reverse()
            .map((star) => (
              <div key={star} className="flex items-center">
                <Typography className="text-sm font-medium text-gray-700 w-8">{star} stars</Typography>
                <LinearProgress
                  variant="determinate"
                  value={ratings.length > 0 ? (ratingCounts[star] / ratings.length) * 100 : 0}
                  className="flex-1 h-3 rounded-lg overflow-hidden"
                  sx={{
                    "& .MuiLinearProgress-bar": {
                      background: "linear-gradient(to right, #ff8c00, #ffd700)",
                    },
                    backgroundColor: "#f3f4f6",
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
