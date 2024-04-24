//
//  LiveTimerBundle.swift
//  LiveTimer
//
//  Created by Igor Pastoreli on 23/04/24.
//

import WidgetKit
import SwiftUI

@main
struct LiveTimerBundle: WidgetBundle {
    var body: some Widget {
        LiveTimer()
        LiveTimerLiveActivity()
    }
}
