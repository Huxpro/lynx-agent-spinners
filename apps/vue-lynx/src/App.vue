<script setup lang="ts">
import { ref, computed } from 'vue-lynx';
import { CATEGORIES, ALL_SPINNERS } from '../../../src/data';
import Spinner from '../../../src/vue/Spinner.vue';

import './App.css';

type CategoryKey = 'all' | 'braille' | 'ascii' | 'arrows' | 'emoji';

const TABS: { key: CategoryKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'braille', label: 'Braille' },
  { key: 'ascii', label: 'ASCII' },
  { key: 'arrows', label: 'Arrows' },
  { key: 'emoji', label: 'Emoji' },
];

const activeTab = ref<CategoryKey>('all');

const visibleCategories = computed(() =>
  activeTab.value === 'all'
    ? CATEGORIES
    : CATEGORIES.filter((c) => c.key === activeTab.value),
);
</script>

<template>
  <page>
    <view class="container">
      <view class="header">
        <text class="headerSubtitle">
          Agent Spinners - {{ ALL_SPINNERS.length }} spinners
        </text>
      </view>

      <scroll-view
        class="tabBarContainer"
        scroll-orientation="horizontal"
        :scrollbar-enable="false"
      >
        <view class="tabBar">
          <view
            v-for="tab in TABS"
            :key="tab.key"
            :class="['tab', { tabActive: activeTab === tab.key }]"
            @tap="activeTab = tab.key"
          >
            <text :class="['tabText', { tabTextActive: activeTab === tab.key }]">
              {{ tab.label }}
            </text>
          </view>
        </view>
      </scroll-view>

      <scroll-view
        class="content"
        scroll-orientation="vertical"
        :scrollbar-enable="false"
      >
        <view class="contentInner">
          <view v-for="cat in visibleCategories" :key="cat.key" class="section">
            <view class="grid">
              <view v-for="def in cat.entries" :key="def.name" class="cell">
                <text class="cellName">{{ def.name }}</text>
                <view class="spinnerArea">
                  <Spinner :definition="def" :size="32" color="#D3D3D3" />
                </view>
              </view>
            </view>
          </view>
          <view :style="{ height: '40px' }" />
        </view>
      </scroll-view>
    </view>
  </page>
</template>
