import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useTheme } from "../../contexts/ThemeContext";

interface IProgressBarProps {
  percentage: number; // 0-100
}

export function ProgressBar({ percentage }: IProgressBarProps) {
  const { theme } = useTheme();

  return (
    <CircularProgressbar
      value={percentage}
      text={`${percentage}%`}
      background
      backgroundPadding={6}
      styles={buildStyles({
        backgroundColor: theme === "dark" ? "#12111380" : "#F4F4F580",
        textColor: theme === "dark" ? "#FACC15" : "#121113",
        textSize: "22px",
        pathColor: "#FACC15",
        trailColor: "transparent",
        strokeLinecap: "round",
        pathTransitionDuration: 0.5,
      })}
    />
  );
}
