//
//  LiveTimerLiveActivity.swift
//  LiveTimer
//
//  Created by Igor Pastoreli on 23/04/24.
//

import ActivityKit
import WidgetKit
import SwiftUI

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
  func getTimerText (timer: Int) -> String {
    let minutes = Int(floor(Double((timer % 3600000) / 60000)));
    let seconds = Int(floor(Double((timer % 60000) / 1000)));
    return "\(minutes):\(seconds)"
  }
  
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: LiveTimerAttributes.self) { context in
            // Lock screen/banner UI goes here
            VStack {
                Text("Hello \(context.state.timer)")
            }
            .activityBackgroundTint(Color.cyan)
            .activitySystemActionForegroundColor(Color.black)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                  Text("\(context.state.timer)")
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("Trailing")
                }
                DynamicIslandExpandedRegion(.bottom) {
                  Text("Bottom \(getTimerText(timer: context.state.timer))")
                    // more content
                }
            } compactLeading: {
                Text("L")
            } compactTrailing: {
                Text("T \(context.state.timer)")
            } minimal: {
              Text("\(context.state.timer)")
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
