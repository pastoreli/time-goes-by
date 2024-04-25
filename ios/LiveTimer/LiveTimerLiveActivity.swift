//
//  LiveTimerLiveActivity.swift
//  LiveTimer
//
//  Created by Igor Pastoreli on 23/04/24.
//

import ActivityKit
import WidgetKit
import SwiftUI

@available(iOS 16.1, *)
struct TimerView: View {
  let timer: Int
  
  var body: some View {
    Text(timerInterval: Date.now...Date(timeInterval: Double(timer) / 1000, since: .now), pauseTime: Date.now)
  }
}

struct LiveTimerAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // Dynamic stateful properties about your activity go here!
      var timer: Int
    }

    // Fixed non-changing properties about your activity go here!
    var name: String
}

@available(iOS 16.1, *)
struct LiveTimerLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: LiveTimerAttributes.self) { context in
          HStack(spacing: 20) {
            Image("logo")
              .resizable()
              .aspectRatio(contentMode: .fit)
              .frame(width: 45, height: 45)
            Spacer()
            HStack(alignment: .bottom, spacing: 10){
              Spacer()
              Spacer()
              Text("Timer")
                .font(.system(size: 20, weight: .bold))
              TimerView(timer: context.state.timer)
                .font(.system(size: 30, weight: .bold))
                .monospacedDigit()
                .frame(width: 135)
            }
            .multilineTextAlignment(.trailing)
            .frame(alignment: .trailing)
          }
          .padding(EdgeInsets(top: 15, leading: 15, bottom: 15, trailing: 15))
          .frame(maxWidth: .infinity)
          .activityBackgroundTint(Color.white)
          .activitySystemActionForegroundColor(Color.black)
        } dynamicIsland: { context in
            DynamicIsland {
              DynamicIslandExpandedRegion(.leading) {
                Image("logo")
                  .resizable()
                  .aspectRatio(contentMode: .fit)
                  .frame(width: 60, height: 60)
              }
              DynamicIslandExpandedRegion(.trailing) {
                VStack(alignment: .trailing, spacing: 10){
                  Text("Timer")
                    .font(.system(size: 16, weight: .bold))
                    TimerView(timer: context.state.timer)
                      .font(.system(size: 30, weight: .bold))
                      .lineLimit(1)
                      .frame(width: 135)
                      .multilineTextAlignment(.trailing)
                      .monospacedDigit()
                }
                .padding(EdgeInsets(top: 0, leading: 10, bottom: 0, trailing: 5))
              }
            } compactLeading: {
              Image("logo").resizable().aspectRatio(contentMode: .fit)
            } compactTrailing: {
              TimerView(timer: context.state.timer)
                .font(.system(size: 14, weight: .bold))
                .frame(maxWidth: 70)
                .multilineTextAlignment(.trailing)
                .padding(EdgeInsets(top: 0, leading: 0, bottom: 0, trailing: 1))
                .monospacedDigit()
            } minimal: {
              Image("logo").resizable().aspectRatio(contentMode: .fit)
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}

//extension LiveTimerAttributes {
//    fileprivate static var preview: LiveTimerAttributes {
//        LiveTimerAttributes(name: "World")
//    }
//}
//
//extension LiveTimerAttributes.ContentState {
//    fileprivate static var smiley: LiveTimerAttributes.ContentState {
//        LiveTimerAttributes.ContentState(emoji: "😀")
//     }
//     
//     fileprivate static var starEyes: LiveTimerAttributes.ContentState {
//         LiveTimerAttributes.ContentState(emoji: "🤩")
//     }
//}

//#Preview("Notification", as: .content, using: LiveTimerAttributes.preview) {
//   LiveTimerLiveActivity()
//} contentStates: {
//    LiveTimerAttributes.ContentState.smiley
//    LiveTimerAttributes.ContentState.starEyes
//}
