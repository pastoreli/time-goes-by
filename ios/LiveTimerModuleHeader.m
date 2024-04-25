//
//  LiveTimerModuleHeader.m
//  TimeGoesBy
//
//  Created by Igor Pastoreli on 23/04/24.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(LiveTimer, NSObject)

RCT_EXTERN_METHOD(startActivity: (NSDictionary *) timerData)
RCT_EXTERN_METHOD(endActivity)

@end
