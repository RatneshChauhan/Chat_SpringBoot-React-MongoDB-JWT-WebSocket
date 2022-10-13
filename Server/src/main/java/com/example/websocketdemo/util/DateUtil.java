/**
 * 
 */
package com.example.websocketdemo.util;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

/**
 * @author ratneshc
 *
 */
public class DateUtil {


	private static final String PATTERN_FORMAT = "dd.MM.yyyy 'at' hh:mm a z";



	public static String FORMATTED_CUR_DATE () {
		Clock clock = Clock.systemDefaultZone();
		Instant instantObj = clock.instant();

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(PATTERN_FORMAT)
				.withZone(ZoneId.systemDefault());

		Instant instant = Instant.parse(instantObj.toString());
		String formattedInstant = formatter.format(instant);
		return formattedInstant ;
	}

	public static String UNFORMATTED_CUR_DATE () {
		Clock clock = Clock.systemDefaultZone();
		Instant instantObj = clock.instant();
		System.out.println("UNFORMATTED_CUR_DATE:"+instantObj.toString());
		return instantObj.toString();
	}

}
