class DatePicker {
    constructor(id, callback) {
        this.id = id;
        this.callback = callback;
    }

    render(date) {
        var date_picker = document.getElementById(this.id);
        var string = "";
        const month = date.toLocaleString('default', { month: 'long' }); 

        // header
        string += `
        <table>
        <thead>
            <tr>
            <td colspan="1" class="leftarrow"><button id="${this.id}-back">\<</button></td>
            <th colspan="5"><h2>${month} ${date.getFullYear()}</h2></th>
            <td colspan="1" class="rightarrow"><button id="${this.id}-forward">\></button></td>
            </tr>
        </thead>`;
    
        // days of week
        string += `
        <tbody>
            <tr>
                <td class="alt1">S</td>
                <td class="alt2">M</td>
                <td class="alt1">T</td>
                <td class="alt2">W</td>
                <td class="alt1">T</td>
                <td class="alt2">F</td>
                <td class="alt1">S</td>
            </tr>
        </tbody>`;

        var date_copy = new Date(date);
        const nextMonth = (date_copy.getMonth() + 1) % 12;
    
        date_copy.setMonth(date_copy.getMonth() + 1);
        date_copy.setDate(0);
        var numDays = date_copy.getDate();
        date_copy = new Date(date);
        date_copy.setDate(1);
        string += `<tbody>`;

        while (date_copy.getMonth() !== nextMonth) { // month
            string += `<tr>`;
            if (date_copy.getDate() === 1) { // insert preliminary days to fill row
    
                // back up to day in previous month that begins first row
                date_copy.setDate(date_copy.getDate() - date_copy.getDay());
    
                // fill in days within first row up until first day of current month
                while (date_copy.getDate() !== 1) {
                    string += `<td class="cal_day notinmonth">${date_copy.getDate()}</td>`;
                    date_copy.setDate(date_copy.getDate() + 1);
                }
            }
    
            for (let j = 0; j < 7; j++) { // week
    
                if (date_copy.getMonth() === nextMonth) { // if end of the month
                    // fill in last days of next month
                    string += `<td class="cal_day notinmonth">${date_copy.getDate()}</td>`;
                    date_copy.setDate(date_copy.getDate() + 1);
                    continue;
                }
    
                if (date_copy.getDate() === 1) {
                    j += date_copy.getDay();
                }
    
                // insert day of month into table
                string += `<td class="cal_day" id="${date_copy.getMonth()}-${date_copy.getDate()}">${date_copy.getDate()}</td>`;
                date_copy.setDate(date_copy.getDate() + 1);
            }
    
            string += `</tr>`;
        }
    
        string += `</tbody>`;
        string += `</table>`;

        date_picker.innerHTML = string;
        
        date_copy = new Date(date);
        date_copy.setDate(1);

        while (date_copy.getMonth() !== nextMonth) {
            var calendar_day = document.getElementById(date_copy.getMonth() + "-" + date_copy.getDate());

            const fixedDate_date = new Date(date_copy);

            calendar_day.addEventListener("click", () => {
                var fixedDate = {
                    month: fixedDate_date.getMonth() + 1,
                    day: fixedDate_date.getDate(),
                    year: fixedDate_date.getFullYear()
                }
                this.callback(this.id, fixedDate);
            });
            

            date_copy.setDate(date_copy.getDate() + 1);
        }

        var bwd_btn = document.getElementById(this.id + "-back");
    
        bwd_btn.addEventListener("click", () => {
            date.setMonth(date.getMonth() - 1);
            this.render(date);
        });
        

        var fwd_btn = document.getElementById(this.id + "-forward");
    
        fwd_btn.addEventListener("click", () => {
            date.setMonth(date.getMonth() + 1);
            this.render(date);
        });
    }
}