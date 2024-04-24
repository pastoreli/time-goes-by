//
//  LiveTimerModule.swift
//  TimeGoesBy
//
//  Created by Igor Pastoreli on 23/04/24.
//

import Foundation
import ActivityKit

@objc(LiveTimer)
class LiveTimer: NSObject {
  
  weak var timer: Timer?
  
  func updateActivity(timerValue: Int){
    let liveTimerContentState = LiveTimerAttributes.ContentState(timer: timerValue)
    if #available(iOS 16.1, *){
      Task{
        for activity in Activity<LiveTimerAttributes>.activities {
          await activity.update(using: liveTimerContentState)
        }
      }
    }else{
      print("Activity not supported")
    }
  }
  
  func startTimer(value: Int) {
    print("timer: value 2: \(value)")
    var timerValue = value
    timer?.invalidate()
    DispatchQueue.main.async {
      self.timer = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { [weak self] _ in
        timerValue = timerValue - 1000;
//        print("timer: value: \(timerValue)")
        self?.updateActivity(timerValue: timerValue)
      }
    }
  }
  
  @objc(startActivity:)
  func startActivity(timerValue: String) {
    let parsedValue = Int(timerValue)
    print("timer: value: \(timerValue)")
    do{
      if #available(iOS 16.1, *){
        let liveTimerAttributes = LiveTimerAttributes(name: "Live Timer")
        let liveTimerContentState = LiveTimerAttributes.ContentState(timer: parsedValue ?? 0)
        let activity = try Activity<LiveTimerAttributes>.request(attributes: liveTimerAttributes, contentState: liveTimerContentState, pushType: nil)
        startTimer(value: parsedValue ?? 0)
      }else{
        print("Dynamic island and live activities not supported")
      }
    }catch (_){
      print("there is some error")
    }
  }
  
  @objc(endActivity)
  func endActivity(){
    timer?.invalidate()
    if #available(iOS 16.1, *){
      Task{
        for activity in Activity<LiveTimerAttributes>.activities {
          await activity.end()
        }
      }
    }else{
      print("Activity not supported")
    }
  }
}
