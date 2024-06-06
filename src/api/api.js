import {API_URL} from "@/api/const.js";

export async function enterFunc(currentTime, setWorkDay) {
    try {
        const formattedTime = new Date(currentTime).toISOString().slice(0, 19).replace('T', ' ');
        const response = await fetch(`${API_URL}/workDays/addWorkDay`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({datetime_entry: formattedTime, datetime_exit: null})
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'There was an error processing.');
        } else {
            await setWorkDay(data.onWorkDay);
        }
    } catch (error) {
        throw new Error('There was an error processing this image.');
    }
}

export async function exitFunc(currentTime, user, setUserOnBreak, setWorkDay, setUserWorkdays) {
    try {
        const formattedTime = new Date(currentTime).toISOString().slice(0, 19).replace('T', ' ');
        const response = await fetch(`${API_URL}/workDays/updateDateTimeExit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({workdayId: user.onWorkDay, datetime_exit: formattedTime})
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'There was an error processing.');
        } else {
            setUserOnBreak(0);
            setWorkDay(0);
            setUserWorkdays(data.workdays);
        }
    } catch (error) {
        throw new Error('There was an error processing this image.');
    }
}

export async function startBreak(currentTime, workdayId, setUserOnBreak) {
    try {
        const formattedTime = new Date(currentTime).toISOString().slice(0, 19).replace('T', ' ');
        const response = await fetch(`${API_URL}/workDays/addBreak`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({workdayId, datetime_entry: formattedTime, datetime_exit: null})
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'There was an error processing.');
        } else {
            setUserOnBreak(data.onBreak);
        }
    } catch (error) {
        throw new Error('There was an error processing this image.');
    }
}

export async function endBreak(currentTime, breakId, setUserOnBreak) {
    try {
        const formattedTime = new Date(currentTime).toISOString().slice(0, 19).replace('T', ' ');
        const response = await fetch(`${API_URL}/workDays/updateBreakTimeExit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({breakId, datetime_exit: formattedTime})
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'There was an error processing.');
        } else {
            setUserOnBreak(0);
        }
    } catch (error) {
        throw new Error('There was an error processing this image.');
    }
}

export async function addCommentFunc(closeDialog, workdayId, comment) {
    try {
        const response = await fetch(`${API_URL}/workDays/addCommentToWorkDay`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({workdayId: workdayId, comment: comment})
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'There was an error processing.');
        } else {
            closeDialog();
        }
    } catch (error) {
        throw new Error('There was an error processing this image.');
    }
}

export async function loginUser(login, password, setUser, routerPush) {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({login: login, password: password})
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'There was an error processing.');
        } else {
            await setUser(data.user);
            routerPush('/profile');
        }
    } catch (error) {
        throw new Error('There was an error processing this image.');
    }
}

export async function registerUser(login,password,setOkMessage) {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({login: login, password: password})
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'There was an error processing.');
        } else {
            await setOkMessage(data.message);
        }
    } catch (error) {
        throw new Error('There was an error processing this image.');
    }
}
