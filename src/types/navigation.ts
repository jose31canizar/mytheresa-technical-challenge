import {NavigatorScreenParams} from '@react-navigation/core';

export type HomeTabParamList = {
  CoinOverview: {};
  SearchList: {};
};

export type MainStackParamList = {
  HomeTab: NavigatorScreenParams<HomeTabParamList>;
  MovieDetail: {title: string};
};
