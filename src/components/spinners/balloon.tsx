import { useEffect, useState } from "react";
import { Text, View, type ViewStyle, type StyleProp } from "react-native";

const FRAMES = [".","o","O","o","."];
const INTERVAL = 120;

interface BalloonSpinnerProps {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export function BalloonSpinner({ size = 24, color = "#fff", style }: BalloonSpinnerProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setFrame((i) => (i + 1) % FRAMES.length), INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <View style={[{ alignItems: "center", justifyContent: "center" }, style]}>
      <Text style={{ fontSize: size, color, textAlign: "center", lineHeight: size * 1.3 }}>
        {FRAMES[frame]}
      </Text>
    </View>
  );
}
