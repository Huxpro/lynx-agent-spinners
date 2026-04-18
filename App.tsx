import { useCallback, useState, type ComponentType } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import {
  DotsSpinner,
  Dots2Spinner,
  Dots3Spinner,
  Dots4Spinner,
  Dots5Spinner,
  Dots6Spinner,
  Dots7Spinner,
  Dots8Spinner,
  Dots9Spinner,
  Dots10Spinner,
  Dots11Spinner,
  Dots12Spinner,
  Dots13Spinner,
  Dots14Spinner,
  SandSpinner,
  BounceSpinner,
  DotsCircleSpinner,
  WaveSpinner,
  ScanSpinner,
  RainSpinner,
  PulseSpinner,
  SnakeSpinner,
  SparkleSpinner,
  CascadeSpinner,
  ColumnsSpinner,
  OrbitSpinner,
  BreatheSpinner,
  WaveRowsSpinner,
  CheckerboardSpinner,
  HelixSpinner,
  FillSweepSpinner,
  DiagSwipeSpinner,
  DqpbSpinner,
  RollingLineSpinner,
  SimpleDotsSpinner,
  SimpleDotsScrollingSpinner,
  ArcSpinner,
  BalloonSpinner,
  CircleHalvesSpinner,
  CircleQuartersSpinner,
  PointSpinner,
  SquareCornersSpinner,
  ToggleSpinner,
  TriangleSpinner,
  GrowHorizontalSpinner,
  GrowVerticalSpinner,
  NoiseSpinner,
  ArrowSpinner,
  DoubleArrowSpinner,
  HeartsSpinner,
  ClockSpinner,
  EarthSpinner,
  MoonSpinner,
  SpeakerSpinner,
  WeatherSpinner,
} from "./src/components/spinners";

interface SpinnerEntry {
  name: string;
  Component: ComponentType<{ size?: number; color?: string }>;
}

const BRAILLE: SpinnerEntry[] = [
  { name: "dots", Component: DotsSpinner },
  { name: "dots2", Component: Dots2Spinner },
  { name: "dots3", Component: Dots3Spinner },
  { name: "dots4", Component: Dots4Spinner },
  { name: "dots5", Component: Dots5Spinner },
  { name: "dots6", Component: Dots6Spinner },
  { name: "dots7", Component: Dots7Spinner },
  { name: "dots8", Component: Dots8Spinner },
  { name: "dots9", Component: Dots9Spinner },
  { name: "dots10", Component: Dots10Spinner },
  { name: "dots11", Component: Dots11Spinner },
  { name: "dots12", Component: Dots12Spinner },
  { name: "dots13", Component: Dots13Spinner },
  { name: "dots14", Component: Dots14Spinner },
  { name: "sand", Component: SandSpinner },
  { name: "bounce", Component: BounceSpinner },
  { name: "dots_circle", Component: DotsCircleSpinner },
  { name: "wave", Component: WaveSpinner },
  { name: "scan", Component: ScanSpinner },
  { name: "rain", Component: RainSpinner },
  { name: "pulse", Component: PulseSpinner },
  { name: "snake", Component: SnakeSpinner },
  { name: "sparkle", Component: SparkleSpinner },
  { name: "cascade", Component: CascadeSpinner },
  { name: "columns", Component: ColumnsSpinner },
  { name: "orbit", Component: OrbitSpinner },
  { name: "breathe", Component: BreatheSpinner },
  { name: "waverows", Component: WaveRowsSpinner },
  { name: "checkerboard", Component: CheckerboardSpinner },
  { name: "helix", Component: HelixSpinner },
  { name: "fillsweep", Component: FillSweepSpinner },
  { name: "diagswipe", Component: DiagSwipeSpinner },
];

const ASCII: SpinnerEntry[] = [
  { name: "dqpb", Component: DqpbSpinner },
  { name: "rolling_line", Component: RollingLineSpinner },
  { name: "simple_dots", Component: SimpleDotsSpinner },
  { name: "simple_dots_scrolling", Component: SimpleDotsScrollingSpinner },
  { name: "arc", Component: ArcSpinner },
  { name: "balloon", Component: BalloonSpinner },
  { name: "circle_halves", Component: CircleHalvesSpinner },
  { name: "circle_quarters", Component: CircleQuartersSpinner },
  { name: "point", Component: PointSpinner },
  { name: "square_corners", Component: SquareCornersSpinner },
  { name: "toggle", Component: ToggleSpinner },
  { name: "triangle", Component: TriangleSpinner },
  { name: "grow_horizontal", Component: GrowHorizontalSpinner },
  { name: "grow_vertical", Component: GrowVerticalSpinner },
  { name: "noise", Component: NoiseSpinner },
];

const ARROWS: SpinnerEntry[] = [
  { name: "arrow", Component: ArrowSpinner },
  { name: "double_arrow", Component: DoubleArrowSpinner },
];

const EMOJI: SpinnerEntry[] = [
  { name: "hearts", Component: HeartsSpinner },
  { name: "clock", Component: ClockSpinner },
  { name: "earth", Component: EarthSpinner },
  { name: "moon", Component: MoonSpinner },
  { name: "speaker", Component: SpeakerSpinner },
  { name: "weather", Component: WeatherSpinner },
];

const CATEGORIES = [
  { key: "braille", label: "Braille", entries: BRAILLE },
  { key: "ascii", label: "ASCII", entries: ASCII },
  { key: "arrows", label: "Arrows", entries: ARROWS },
  { key: "emoji", label: "Emoji", entries: EMOJI },
] as const;

type CategoryKey = "all" | (typeof CATEGORIES)[number]["key"];

const TABS: { key: CategoryKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "braille", label: "Braille" },
  { key: "ascii", label: "ASCII" },
  { key: "arrows", label: "Arrows" },
  { key: "emoji", label: "Emoji" },
];

function SpinnerCell({ entry }: { entry: SpinnerEntry }) {
  const { name, Component } = entry;
  return (
    <View style={styles.cell}>
      <Text style={styles.cellName}>{name}</Text>
      <View style={styles.spinnerArea}>
        <Component size={32} color="#D3D3D3" />
      </View>
    </View>
  );
}

function CategorySection({ label, entries }: { label: string; entries: SpinnerEntry[] }) {
  return (
    <View style={styles.section}>
      <View style={styles.grid}>
        {entries.map((entry) => (
          <SpinnerCell key={entry.name} entry={entry} />
        ))}
      </View>
    </View>
  );
}

function SpinnersScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<CategoryKey>("all");

  const handleTabPress = useCallback((key: CategoryKey) => setActiveTab(key), []);

  const visibleCategories =
    activeTab === "all"
      ? CATEGORIES
      : CATEGORIES.filter((c) => c.key === activeTab);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Text style={styles.headerSubtitle}>
          Agent Spinners - {BRAILLE.length + ASCII.length + ARROWS.length + EMOJI.length} spinners
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabBar}
        style={styles.tabBarContainer}
      >
        {TABS.map((tab) => (
          <Pressable
            key={tab.key}
            onPress={() => handleTabPress(tab.key)}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
          >
            <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentInner}
        showsVerticalScrollIndicator={false}
      >
        {visibleCategories.map((cat) => (
          <CategorySection key={cat.key} label={cat.label} entries={cat.entries} />
        ))}
        <View style={{ height: insets.bottom + 40 }} />
      </ScrollView>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SpinnersScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 2,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  tabBarContainer: {
    maxHeight: 44,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  tabBar: {
    paddingHorizontal: 16,
    gap: 6,
    alignItems: "center",
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  tabActive: {
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  tabText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 13,
    fontWeight: "600",
  },
  tabTextActive: {
    color: "#fff",
  },
  content: {
    flex: 1,
  },
  contentInner: {
    padding: 16,
    paddingTop: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.8,
    textTransform: "uppercase",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  cell: {
    width: "20%",
    flexGrow: 1,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: "center",
    gap: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.07)",
  },
  spinnerArea: {
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  cellName: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 10,
    fontWeight: "500",
    textAlign: "center",
  },
});
