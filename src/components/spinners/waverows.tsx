import { useEffect, useState } from "react";
import { Text, View, type ViewStyle, type StyleProp } from "react-native";

const FRAMES = ["⠖⠉⠉⠑","⡠⠖⠉⠉","⣠⡠⠖⠉","⣄⣠⡠⠖","⠢⣄⣠⡠","⠙⠢⣄⣠","⠉⠙⠢⣄","⠊⠉⠙⠢","⠜⠊⠉⠙","⡤⠜⠊⠉","⣀⡤⠜⠊","⢤⣀⡤⠜","⠣⢤⣀⡤","⠑⠣⢤⣀","⠉⠑⠣⢤","⠋⠉⠑⠣"];
const INTERVAL = 90;

interface WaveRowsSpinnerProps {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export function WaveRowsSpinner({ size = 24, color = "#fff", style }: WaveRowsSpinnerProps) {
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
