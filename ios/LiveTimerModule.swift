//
//  LiveTimerModule.swift
//  TimeGoesBy
//
//  Created by Igor Pastoreli on 23/04/24.
//

import Foundation
import ActivityKit

@available(iOS 16.1, *)
@objc(LiveTimer)
class LiveTimer: NSObject {
  
  weak var timer: Timer?
  
  @objc(startActivity:)
  func startActivity(timerData: NSDictionary) {
    endActivity()
    guard let timerDataInfo = timerData as? [String: Any] else {
      return
    }
    let parsedValue = Int((timerDataInfo["timerValue"]) as! String) ?? 0
    do{
      let liveTimerAttributes = LiveTimerAttributes(name: "Live Timer")
      let liveTimerContentState = LiveTimerAttributes.ContentState(timer: parsedValue)
      let liveTimerActivity = try Activity<LiveTimerAttributes>.request(attributes: liveTimerAttributes, contentState: liveTimerContentState, pushType: nil)
    }catch (_){
      print("there is some error")
    }
  }
  
  @objc(endActivity)
  func endActivity(){
    timer?.invalidate()
    Task{
      for activity in Activity<LiveTimerAttributes>.activities {
        await activity.end(dismissalPolicy:  .after(.now))
      }
    }
  }
}
