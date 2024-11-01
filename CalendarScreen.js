// CalendarScreen.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { format, startOfWeek, addDays } from 'date-fns';
import classesData from './classes.json'; // Adjust the path as necessary

const CalendarScreen = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [classes, setClasses] = useState([]);

    // Load classes data
    useEffect(() => {
        setClasses(classesData.classes);
    }, []);

    // Get the start date of the current week
    const getStartOfWeek = (date) => {
        return startOfWeek(date);
    };

    // Get the classes for a specific date, selecting only the first section
    const getClassesForDate = (date) => {
        const formattedDate = format(date, 'EEEE').charAt(0).toUpperCase(); // First letter of day
        const classesOnDate = classes.flatMap((course) => {
            // Only use the first section of each class
            const firstSection = course.classSections[0];
            return firstSection ? firstSection.timeLocations.map((location) => {
                const days = location.days.trim().split(' ').filter(Boolean);
                if (days.includes(formattedDate)) {
                    return {
                        title: course.title,
                        section: firstSection.section,
                        time: `${location.beginTime} - ${location.endTime}`,
                        room: location.room,
                        days: location.days.trim(), // Capture days
                    };
                }
                return null;
            }) : [];
        });

        return classesOnDate.filter(Boolean);
    };

    // Get the days of the current week
    const getWeekDays = () => {
        const start = getStartOfWeek(currentDate);
        return Array.from({ length: 7 }, (_, index) => addDays(start, index));
    };

    const weekDays = getWeekDays();

    // Change the week by +/- 7 days
    const changeWeek = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + direction * 7);
        setCurrentDate(newDate);
    };

    const renderDay = (item) => {
        const classesOnDate = getClassesForDate(item);
        return (
            <View style={styles.dayContainer}>
                <Text style={styles.dateText}>{format(item, 'EEEE')}</Text>
                {classesOnDate.length > 0 ? (
                    classesOnDate.map((classItem, index) => (
                        <View key={index} style={styles.classContainer}>
                            <Text style={styles.classTitle}>{classItem.title}</Text>
                            <Text>Section: {classItem.section}</Text>
                            <Text>Time: {classItem.time}</Text>
                            <Text>Room: {classItem.room}</Text>
                            <Text>Days: {classItem.days}</Text>
                        </View>
                    ))
                ) : (
                    <Text>No classes scheduled.</Text>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <TouchableOpacity onPress={() => changeWeek(-1)}>
                    <Text style={styles.navButton}>Previous Week</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => changeWeek(1)}>
                    <Text style={styles.navButton}>Next Week</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={weekDays}
                renderItem={({ item }) => renderDay(item)}
                keyExtractor={(item) => item.toString()}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    navButton: {
        fontSize: 18,
        color: 'blue',
    },
    dayContainer: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    classContainer: {
        marginVertical: 5,
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '90%',
    },
    classTitle: {
        fontWeight: 'bold',
    },
});

export default CalendarScreen;
