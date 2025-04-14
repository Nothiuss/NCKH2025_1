// Thêm trình nghe sự kiện
document.getElementById('yearSelector').addEventListener('change', function() {
  var selectedYear = this.value;
  updateCharts(selectedYear);
});

// Hàm cập nhật các biểu đồ
function updateCharts(year) {
  console.log("Cập nhật biểu đồ cho năm: " + year);

  // Cập nhật dữ liệu cho mỗi biểu đồ
  renderMonthChart(year);
  renderWeekChart(year);
  renderHourChart(year);
  renderHourChart_Pie(year);
  renderSeasonChart(year);
  renderSeasonChart_Pie(year);
  renderVehChart(year);
  renderVehChart_Pie(year);
  renderGenderChart(year);
  renderGenderChart_Pie(year);
  renderAgeChart(year);
  renderAgeChart_Pie(year);
  renderSeverityChart(year);
  renderSeverityChart_Pie(year);
  renderCauseChart(year);
  renderCauseChart_Pie(year);
  renderRoadChart(year);
  renderRoadChart_Pie(year);
}



 function renderMonthChart() {
  // Lấy dữ liệu từ API
  fetch('http://localhost:8000/api/data_month')
  .then(response => response.json())
  .then(data_month => {
    data_month.sort((a, b) => a.Months - b.Months);
    // Chuyển dữ liệu thành dạng mà D3.js có thể sử dụng
    const xValues = data_month.map(d => d.Months); // Cột x_value
    const yValues = data_month.map(d => d.Accidents); // Cột y_value

    // Thiết lập canvas
    const svg = d3.select('#month-chart')
          .append('svg')
          .attr('width', 500)
          .attr('height', 300);

    const margin = { top: 20, right: 30, bottom: 20, left: 50 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Thang đo (scales)
    const x = d3.scaleBand()
              .domain(xValues)
              .range([0, width])
              .padding(0.1);

    const y = d3.scaleLinear()
                .domain([0, d3.max(yValues)])
                    .range([height, 0]);

        // Trục X và Y
    g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    g.append("g")
      .call(d3.axisLeft(y));

      // Thêm tiêu đề
    g.append("text")
    .attr("x", width / 2)
    .attr("y", - margin.top /3 ) // Đặt phía trên biểu đồ
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Phân bố TNGT theo tháng");

    // Vẽ cột
    g.selectAll(".bar")
      .data(data_month)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.Months))
      .attr("y", d => y(d.Accidents))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.Accidents))
      .attr("fill", "#7B68EE");
      
  });
}


function renderWeekChart() {
  // Lấy dữ liệu từ API
  fetch('http://localhost:8000/api/data_week')
  .then(response => response.json())
  .then(data_week => {
    const weekOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    data_week.sort((a, b) => weekOrder.indexOf(a.day_name) - weekOrder.indexOf(b.day_name));
    // Chuyển dữ liệu thành dạng mà D3.js có thể sử dụng
    const xValues = data_week.map(d => d.day_name); //    Cột x_value
    const yValues = data_week.map(d => d.Accidents); //   Cột y_value

    // Thiết lập canvas
    const svg = d3.select('#week-chart')
          .append('svg')
          .attr('width', 500)
          .attr('height', 300);

    const margin = { top: 20, right: 30, bottom: 20, left: 50 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Thang đo (scales)
    const x = d3.scaleBand()
              .domain(xValues)
              .range([0, width])
              .padding(0.1);

    const y = d3.scaleLinear()
                .domain([0, d3.max(yValues)])
                .range([height, 0]);

        // Trục X và Y
    g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    g.append("g")
      .call(d3.axisLeft(y));
    
    // Thêm tiêu đề
    g.append("text")
    .attr("x", width / 2)
    .attr("y", - margin.top /3 ) // Đặt phía trên biểu đồ
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Phân bố TNGT theo ngày");

    // Vẽ cột
    g.selectAll(".bar")
      .data(data_week)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.day_name))
      .attr("y", d => y(d.Accidents))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.Accidents))
      .attr("fill", "#7B68EE");
  });
}

function renderHourChart() {
  // Lấy dữ liệu từ API
  fetch('http://localhost:8000/api/data_hour')
  .then(response => response.json())
  .then(data_hour => {
    //data_hour.sort((a, b) => a.Months - b.Months);
    // Chuyển dữ liệu thành dạng mà D3.js có thể sử dụng
    const xValues = data_hour.map(d => d.hour_name); // Cột x_value
    const yValues = data_hour.map(d => d.Accidents); // Cột y_value

    // Thiết lập canvas
    const svg = d3.select('#hour-chart')
          .append('svg')
          .attr('width', 500)
          .attr('height', 300);

    const margin = { top: 20, right: 30, bottom: 20, left: 50 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Thang đo (scales)
    const x = d3.scaleBand()
              .domain(xValues)
              .range([0, width])
              .padding(0.1);

    const y = d3.scaleLinear()
                .domain([0, d3.max(yValues)])
                    .range([height, 0]);

        // Trục X và Y
    g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    g.append("g")
      .call(d3.axisLeft(y));

      // Thêm tiêu đề
    g.append("text")
    .attr("x", width / 2)
    .attr("y", - margin.top / 3 ) // Đặt phía trên biểu đồ
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Phân bố TNGT theo khung giờ");

    // Vẽ cột
    g.selectAll(".bar")
      .data(data_hour)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.hour_name))
      .attr("y", d => y(d.Accidents))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.Accidents))
      .attr("fill", "#7B68EE");
      
  });
}

function renderHourChart_Pie() {
  // Lấy dữ liệu từ API
  fetch('http://localhost:8000/api/data_hour')
  .then(response => response.json())
  .then(data_hour => {

    // Chuyển dữ liệu thành dạng mà D3.js có thể sử dụng
    const xValues = data_hour.map(d => d.hour_name); // Cột x_value
    const yValues = data_hour.map(d => d.Accidents); // Cột y_value

    // Tính tổng và chuyển đổi thành phần trăm
    const total = d3.sum(data_hour, d => d.Accidents);
    const percentData = data_hour.map(d => ({
                          label: d.hour_name,
                          value: (d.Accidents / total) * 100  }));

    // Thiết lập canvas
    const width = 500;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select('#hour-chart')
          .append('svg')
          .attr('width', width)
          .attr('height', height)

    
    const g = svg.append('g')
          .attr('transform', `translate(${radius}, ${radius})`);// Di chuyển vào giữa SVG

    // Tạo một hàm layout cho pie chart
    const pie = d3.pie()
          .value(d => d.Accidents); // Lấy giá trị từ dữ liệu
    

    const arc = d3.arc()
        .innerRadius(0) // Biểu đồ tròn đầy đủ (không có lỗ ở giữa)
        .outerRadius(radius); // Đặt bán kính ngoài

    // Tạo các đoạn biểu đồ tròn
    const color = d3.scaleOrdinal()
        .domain(data_hour.map(d => d.hour_name))
        .range(d3.schemeCategory10);
        //.range(["#444444", "#555555", "#666666","#666666"]); 

    const pieData = pie(data_hour);

    // Vẽ bieu do
    g.selectAll('path')
    .data(pieData)
    .enter()
    .append('path')
    .attr('d', arc) // Vẽ từng đoạn
    .attr('fill', d => color(data_hour.map(d => d.hour_name))) // Gán màu sắc
    .attr('class','slice')
    .attr('stroke', 'white') // Đường viền giữa các phần
    .attr('stroke-width', 2);

    
    g.selectAll('text')
    .data(pieData)
    .enter()
    .append('text')
    .attr('transform', d => `translate(${arc.centroid(d)})`) // Đặt nhãn ở trung tâm mỗi arc
    .attr('text-anchor', 'middle');
    //.attr('dy', '0.35em')
    //.attr('font-size', '14px')
    //.attr('fill', 'black')
    //.text(d => `${xValues}`); // Tính % và hiển thị
   
    d3.select('#hour-chart')
    .append("text")
    .attr("x", width)
    .attr("y", 100) // Đặt phía trên biểu đồ
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Phân bố TNGT theo giờ");

  });

}

function renderSeasonChart() {
  // Lấy dữ liệu từ API
  fetch('http://localhost:8000/api/data_season')
  .then(response => response.json())
  .then(data_season => {
    //data_hour.sort((a, b) => a.Months - b.Months);
    // Chuyển dữ liệu thành dạng mà D3.js có thể sử dụng
    const xValues = data_season.map(d => d.season_name); // Cột x_value
    const yValues = data_season.map(d => d.Accidents); // Cột y_value

    // Thiết lập canvas
    const svg = d3.select('#season-chart')
          .append('svg')
          .attr('width', 500)
          .attr('height', 300);

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Thang đo (scales)
    const x = d3.scaleBand()
              .domain(xValues)
              .range([0, width])
              .padding(0.1);

    const y = d3.scaleLinear()
                .domain([0, d3.max(yValues)])
                    .range([height, 0]);

        // Trục X và Y
    g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    g.append("g")
      .call(d3.axisLeft(y));

      // Thêm tiêu đề
    g.append("text")
    .attr("x", width / 2)
    .attr("y", margin.top / 100 ) // Đặt phía trên biểu đồ
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Phân bố TNGT theo mùa");

    // Vẽ cột
    g.selectAll(".bar")
      .data(data_season)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.season_name))
      .attr("y", d => y(d.Accidents))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.Accidents))
      .attr("fill", "steelblue");
      
  });
}

function renderSeasonChart_Pie() {
  // Lấy dữ liệu từ API
  fetch('http://localhost:8000/api/data_season')
  .then(response => response.json())
  .then(data_season => {

    // Chuyển dữ liệu thành dạng mà D3.js có thể sử dụng
    const xValues = data_season.map(d => d.season_name); // Cột x_value
    const yValues = data_season.map(d => d.Accidents); // Cột y_value

    // Tính tổng và chuyển đổi thành phần trăm
    const total = d3.sum(data_season, d => d.Accidents);
    const percentData = data_season.map(d => ({
                          label: d.season_name,
                          value: (d.Accidents / total) * 100  }));

    // Thiết lập canvas
    
    const width = 500;
    const height =300;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select('#season-chart')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
    
    
    const g = svg.append('g')
          .attr('transform', `translate(${radius}, ${radius})`);// Di chuyển vào giữa SVG

    // Tạo một hàm layout cho pie chart
    const pie = d3.pie()
          .value(d => d.Accidents); // Lấy giá trị từ dữ liệu
    

    const arc = d3.arc()
        .innerRadius(0) // Biểu đồ tròn đầy đủ (không có lỗ ở giữa)
        .outerRadius(radius); // Đặt bán kính ngoài

    // Tạo các đoạn biểu đồ tròn
    const color = d3.scaleOrdinal()
        .domain(data_season.map(d => d.season_name))
        .range(d3.schemeCategory10);
        //.range(["#444444", "#555555", "#666666","#666666"]); 

    const pieData = pie(data_season);

    // Vẽ bieu do
    g.selectAll('path')
    .data(pieData)
    .enter()
    .append('path')
    .attr('d', arc) // Vẽ từng đoạn
    .attr('fill', d => color(data_season.map(d => d.season_name))) // Gán màu sắc
    .attr('class','slice')
    .attr('stroke', 'white') // Đường viền giữa các phần
    .attr('stroke-width', 2);

    
    g.selectAll('text')
    .data(pieData)
    .enter()
    .append('text')
    .attr('transform', d => `translate(${arc.centroid(d)})`) // Đặt nhãn ở trung tâm mỗi arc
    .attr('text-anchor', 'middle');
    //.attr('dy', '0.35em')
    //.attr('font-size', '14px')
    //.attr('fill', 'black')
    //.text(d => `${xValues}`); // Tính % và hiển thị

    d3.select('#season-chart')
    .append("text")
    .attr("x", width)
    .attr("y", 100) // Đặt phía trên biểu đồ
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Phân bố TNGT theo mùa");

    g.selectAll('.legend')     
    .data(pieData)     
    .enter()     
    .append('text')     
    .attr('x', 200)     
    .attr('y', (d, i) => i * 20)  ;   
    //.text(d => `${data_season.map(d => d.season_name)}: ${d.Accidents}`);

  });
}

function renderVehChart() {
  // Lấy dữ liệu từ API
  fetch('http://localhost:8000/api/data_Veh')
  .then(response => response.json())
  .then(data_Veh => {
    //data_month.sort((a, b) => a.Months - b.Months);
    // Chuyển dữ liệu thành dạng mà D3.js có thể sử dụng
    const xValues = data_Veh.map(d => d.Veh_1); // Cột x_value
    const yValues = data_Veh.map(d => d.Accidents); // Cột y_value

    // Thiết lập canvas
    const svg = d3.select('#veh-chart')
          .append('svg')
          .attr('width', 500)
          .attr('height', 300);

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Thang đo (scales)
    const x = d3.scaleBand()
              .domain(xValues)
              .range([0, width])
              .padding(0.1);

    const y = d3.scaleLinear()
                .domain([0, d3.max(yValues)])
                    .range([height, 0]);

        // Trục X và Y
    g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    g.append("g")
      .call(d3.axisLeft(y));

      // Thêm tiêu đề
    g.append("text")
    .attr("x", width / 2)
    .attr("y", margin.top / 100 ) // Đặt phía trên biểu đồ
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Phân bố TNGT theo loại xe");

    // Vẽ cột
    g.selectAll(".bar")
      .data(data_Veh)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.Veh_1))
      .attr("y", d => y(d.Accidents))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.Accidents))
      .attr("fill", "steelblue");
      
  });
}

function renderVehChart_Pie() {
  // Lấy dữ liệu từ API
  fetch('http://localhost:8000/api/data_Veh')
  .then(response => response.json())
  .then(data_Veh => {
    //data_month.sort((a, b) => a.Months - b.Months);
    // Chuyển dữ liệu thành dạng mà D3.js có thể sử dụng
    const xValues = data_Veh.map(d => d.Veh_1); // Cột x_value
    const yValues = data_Veh.map(d => d.Accidents); // Cột y_value

    // Tính tổng và chuyển đổi thành phần trăm
    const total = d3.sum(data_Veh, d => d.Accidents);
    const percentData = data_Veh.map(d => ({
                          label: d.Veh_1,
                          value: (d.Accidents / total) * 100  }));

    
    
                          // Thiết lập canvas
    const svg = d3.select('#veh-chart')
                  .append('svg')
                  .attr('width', 500)
                  .attr('height',300)
    
    const margin = { top: 20, right: 20, bottom: 10, left: 20 };
    const width = svg.attr("width") - margin.right - margin.left
    const height = svg.attr("height") - margin.top - margin.bottom
    const radius = Math.min(width, height) / 2 -15;

    const g = svg.append('g').attr('transform', `translate(${svg.attr("width")/2-70}, ${svg.attr("height")/2 + 15})`);// Di chuyển vào giữa SVG

    // Tạo một hàm layout cho pie chart
    const pie = d3.pie()
          .value(d => d.Accidents); // Lấy giá trị từ dữ liệu
    
    const arc = d3.arc()
        .innerRadius(0) // Biểu đồ tròn đầy đủ (không có lỗ ở giữa)
        .outerRadius(radius); // Đặt bán kính ngoài

    // Tạo các đoạn biểu đồ tròn
    const color = d3.scaleOrdinal()
        .domain(data_Veh.map(d => d.Veh_1))
        //.range(d3.schemeCategory10);
        .range(["cyan", "orange", "steelblue","#D2B48C","#800080","#F4A460","#778899"]); 

    const pieData = pie(data_Veh);

    // Vẽ bieu do
    g.selectAll('path')
    .data(pieData)
    .enter()
    .append('path')
    .attr('d', arc) // Vẽ từng đoạn
    .attr('fill', (d,i) => color(i))
    .attr('class','slice')
    .attr('stroke', 'white') // Đường viền giữa các phần
    .attr('stroke-width', 2);

    
    g.selectAll('text')
    .data(pieData)
    .enter()
    .append('text')
    //.attr('transform', d => `translate(${arc.centroid(d)})`) // Đặt nhãn ở trung tâm mỗi arc
    .attr("transform", function(d) {
      const pos = arc.centroid(d); // Lấy vị trí trung tâm của phần lát
      pos[0] *= 2.3; // Di chuyển nhãn ra ngoài theo trục X
      pos[1] *= 2.15; // Di chuyển nhãn ra ngoài theo trục Y
      return `translate(${pos})`;
  })
    //.attr("text-anchor", function(d) {   return (d.startAngle + d.endAngle) > Math.PI ? "end" : "start"; // Căn chỉnh trái/phải })

    .attr('text-anchor', 'middle')
    .attr('dy', '0.05em')
    .attr('font-size', '14px')
    .attr('fill', 'black')
    .text((d,i) => `${(100*yValues[i]/total).toFixed(1)}${"%"}`); // Tính % và hiển thị
    //.text((d,i) => `${xValues[i]},${(100*yValues[i]/total).toFixed(1)}${"%"}`); // Tính % và hiển thị

    g.append("text")
    .attr("x", 0 )
    .attr("y", -radius-25 ) // Đặt phía trên biểu đồ
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Tỷ lệ TNGT loại xe");

     // Thêm legend bên cạnh biểu đồ
     const legend = svg.selectAll(".legend")
                  .data(data_Veh.map(d => d.Veh_1))
                  .enter()
                  .append("g")
                  .attr("class", "legend")
                  .attr("transform", (d, i) => `translate(${radius + 225}, ${ 100+i*25})`);

      // Hình chữ nhật trong legend
        legend.append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 15)
          .attr("height", 15)
          .attr("fill", (d,i) => color(i))
          // Văn bản trong legend
        legend.append("text")
        .attr("x", 20)
        .attr("y", 12) // Căn chỉnh văn bản theo chiều dọc
        .style("font-size", "12px")
        .text(d => d);
        

  });
}

function renderGenderChart() {
  // Lấy dữ liệu từ API
  fetch('http://localhost:8000/api/data_gender')
  .then(response => response.json())
  .then(data_gender=> {
    //data_month.sort((a, b) => a.Months - b.Months);
    // Chuyển dữ liệu thành dạng mà D3.js có thể sử dụng
    const xValues = data_gender.map(d => d.Gender_1); // Cột x_value
    const yValues = data_gender.map(d => d.Accidents); // Cột y_value

    // Thiết lập canvas
    const svg = d3.select('#gender-chart')
          .append('svg')
          .attr('width', 500)
          .attr('height', 300);

    const margin = { top: 20, right: 30, bottom: 20, left: 50 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Thang đo (scales)
    const x = d3.scaleBand()
              .domain(xValues)
              .range([0, width])
              .padding(0.1);

    const y = d3.scaleLinear()
                .domain([0, d3.max(yValues)])
                    .range([height, 0]);

        // Trục X và Y
    g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    g.append("g")
      .call(d3.axisLeft(y));

      // Thêm tiêu đề
    g.append("text")
    .attr("x", width / 2)
    .attr("y", margin.top / 100 ) // Đặt phía trên biểu đồ
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Phân bố TNGT theo giới tính");

    // Vẽ cột
    g.selectAll(".bar")
      .data(data_gender)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.Gender_1))
      .attr("y", d => y(d.Accidents))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.Accidents))
      .attr("fill", "steelblue");
      
  });
}

function renderGenderChart_Pie() {
  // Lấy dữ liệu từ API
  fetch('http://localhost:8000/api/data_gender')
  .then(response => response.json())
  .then(data_gender=> {

    // Chuyển dữ liệu thành dạng mà D3.js có thể sử dụng
    const xValues = data_gender.map(d => d.Gender_1); // Cột x_value
    const yValues = data_gender.map(d => d.Accidents); // Cột y_value

    // Tính tổng và chuyển đổi thành phần trăm
    const total = d3.sum(data_gender, d => d.Accidents);
    const percentData = data_gender.map(d => ({
                          label: d.Gender_1,
                          value: (d.Accidents / total) * 100  }));

    
    
                          // Thiết lập canvas
    const svg = d3.select('#gender-chart')
                  .append('svg')
                  .attr('width', 500)
                  .attr('height', 300)
    
    const margin = { top: 20, right: 20, bottom: 10, left: 20 };
    const width = svg.attr("width") - margin.right - margin.left
    const height = svg.attr("height") - margin.top - margin.bottom
    const radius = Math.min(width, height) / 2 -15;

    const g = svg.append('g').attr('transform', `translate(${svg.attr("width")/2}, ${svg.attr("height")/2+15})`);// Di chuyển vào giữa SVG

    // Tạo một hàm layout cho pie chart
    const pie = d3.pie()
          .value(d => d.Accidents); // Lấy giá trị từ dữ liệu
    

    const arc = d3.arc()
        .innerRadius(0) // Biểu đồ tròn đầy đủ (không có lỗ ở giữa)
        .outerRadius(radius); // Đặt bán kính ngoài

    // Tạo các đoạn biểu đồ tròn
    const color = d3.scaleOrdinal()
        .domain(data_gender.map(d => d.Gender_1))
        //.range(d3.schemeCategory10);
        //.range(["#444444", "#555555", "#666666","#666666"]); 
        .range(["orange", "steelblue"]); 

    const pieData = pie(data_gender);

    // Vẽ bieu do
    g.selectAll('path')
    .data(pieData)
    .enter()
    .append('path')
    .attr('d', arc) // Vẽ từng đoạn
    .attr('fill', d => color(data_gender.map(d => d.Gender_1))) // Gán màu sắc
    .attr('class','slice')
    .attr('stroke', 'white') // Đường viền giữa các phần
    .attr('stroke-width', 2);

    
    g.selectAll('text')
    .data(pieData)
    .enter()
    .append('text')
    .attr('transform', d => `translate(${arc.centroid(d)})`) // Đặt nhãn ở trung tâm mỗi arc
    .attr('text-anchor', 'middle')
    .attr('dy', '1em')
    .attr('font-size', '14px')
    .attr('fill', 'black')
    .text((d,i) => `${xValues[i]},${(100*yValues[i]/total).toFixed(1)}${"%"}`); // Tính % và hiển thị

    g.append("text")
    .attr("x", 0 )
    .attr("y", -radius-25 ) // Đặt phía trên biểu đồ
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Tỷ lệ TNGT theo giới");


    g.selectAll('.legend')     
    .data(pieData)     
    .enter()     
    .append('text')     
    .attr('x', 200)     
    .attr('y', (d, i) => i * 20)  ;   
    //.text(d => `${data_season.map(d => d.season_name)}: ${d.Accidents}`);

  });
}

function renderAgeChart() {
  // Lấy dữ liệu từ API
  fetch('http://localhost:8000/api/data_age')
  .then(response => response.json())
  .then(data_age => {
    const ageOrder = ["<25", "25-45", "45-55", ">55"];
    data_age.sort((a, b) => ageOrder.indexOf(a.age_name) - ageOrder.indexOf(b.age_name));
    // Chuyển dữ liệu thành dạng mà D3.js có thể sử dụng
    const xValues = data_age.map(d => d.age_name); //    Cột x_value
    const yValues = data_age.map(d => d.Accidents); //   Cột y_value

    // Thiết lập canvas
    const svg = d3.select('#age-chart')
          .append('svg')
          .attr('width', 500)
          .attr('height', 300);

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Thang đo (scales)
    const x = d3.scaleBand()
              .domain(xValues)
              .range([0, width])
              .padding(0.1);

    const y = d3.scaleLinear()
                .domain([0, d3.max(yValues)])
                .range([height, 0]);

        // Trục X và Y
    g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    g.append("g")
      .call(d3.axisLeft(y));
    
    // Thêm tiêu đề
    g.append("text")
    .attr("x", width / 2)
    .attr("y", margin.top /1000 ) // Đặt phía trên biểu đồ
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Phân bố TNGT theo tuổi");

    // Vẽ cột
    g.selectAll(".bar")
      .data(data_age)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.age_name))
      .attr("y", d => y(d.Accidents))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.Accidents))
      .attr("fill", "steelblue");
  });
}

function renderAgeChart_Pie() {
  // Lấy dữ liệu từ API
  fetch('http://localhost:8000/api/data_age')
  .then(response => response.json())
  .then(data_age=> {

    // Chuyển dữ liệu thành dạng mà D3.js có thể sử dụng
    const xValues = data_age.map(d => d.age_name); // Cột x_value
    const yValues = data_age.map(d => d.Accidents); // Cột y_value

    // Tính tổng và chuyển đổi thành phần trăm
    const total = d3.sum(data_age, d => d.Accidents);
    const percentData = data_age.map(d => ({
                          label: d.age_name,
                          value: (d.Accidents / total) * 100  }));

    
    
                          // Thiết lập canvas
    const svg = d3.select('#age-chart')
                  .append('svg')
                  .attr('width', 500)
                  .attr('height', 300)
    
    const margin = { top: 20, right: 20, bottom: 10, left: 20 };
    const width = svg.attr("width") - margin.right - margin.left
    const height = svg.attr("height") - margin.top - margin.bottom
    const radius = Math.min(width, height) / 2 -15 ;

    const g = svg.append('g').attr('transform', `translate(${svg.attr("width")/2-50}, ${svg.attr("height")/2 +15})`);// Di chuyển vào giữa SVG

    // Tạo một hàm layout cho pie chart
    const pie = d3.pie()
          .value(d => d.Accidents); // Lấy giá trị từ dữ liệu
    

    const arc = d3.arc()
        .innerRadius(0) // Biểu đồ tròn đầy đủ (không có lỗ ở giữa)
        .outerRadius(radius); // Đặt bán kính ngoài

    // Tạo các đoạn biểu đồ tròn
    const color = d3.scaleOrdinal()
        .domain(data_age.map(d => d.age_name))
        //.range(d3.schemeCategory10);
        .range(["cyan", "orange", "steelblue","#999999"]); 

    const pieData = pie(data_age);

    // Vẽ bieu do
    g.selectAll('path')
    .data(pieData)
    .enter()
    .append('path')
    .attr('d', arc) // Vẽ từng đoạn
    .attr('fill', d => color(data_age.map(d => d.age_name))) // Gán màu sắc
    .attr('class','slice')
    .attr('stroke', 'white') // Đường viền giữa các phần
    .attr('stroke-width', 2);

    
    g.selectAll('text')
    .data(pieData)
    .enter()
    .append('text')
    .attr('transform', d => `translate(${arc.centroid(d)})`) // Đặt nhãn ở trung tâm mỗi arc
    .attr('text-anchor', 'middle')
    .attr('dy', '0.2em')
    .attr('font-size', '14px')
    .attr('fill', 'black')
    .text((d,i) => `${(100*yValues[i]/total).toFixed(1)}${"%"}`); // Tính % và hiển thị
    //.text((d,i) => `${xValues[i]},${(100*yValues[i]/total).toFixed(1)}${"%"}`); // Tính % và hiển thị

    g.append("text")
    .attr("x", 0 )
    .attr("y", -radius-15 ) // Đặt phía trên biểu đồ
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Tỷ lệ TNGT theo tuổi");

     // Thêm legend bên cạnh biểu đồ
     const legend = svg.selectAll(".legend")
                  .data(data_age.map(d => d.age_name))
                  .enter()
                  .append("g")
                  .attr("class", "legend")
                  .attr("transform", (d, i) => `translate(${radius + 250}, ${150+i * 25})`);

      // Hình chữ nhật trong legend
        legend.append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 15)
          .attr("height", 15)
          .attr("fill", d => color(data_age.map(d => d.age_name))) // Gán màu sắc
          // Văn bản trong legend
        legend.append("text")
        .attr("x", 20)
        .attr("y", 12) // Căn chỉnh văn bản theo chiều dọc
        .style("font-size", "12px")
        .text(d => d);

  });
}



function renderGenderChart() {
  // Lấy dữ liệu từ API
  fetch('http://localhost:8000/api/data_gender')
  .then(response => response.json())
  .then(data_gender=> {
    //data_month.sort((a, b) => a.Months - b.Months);
    // Chuyển dữ liệu thành dạng mà D3.js có thể sử dụng
    const xValues = data_gender.map(d => d.Gender_1); // Cột x_value
    const yValues = data_gender.map(d => d.Accidents); // Cột y_value

    // Thiết lập canvas
    const svg = d3.select('#gender-chart')
          .append('svg')
          .attr('width', 500)
          .attr('height', 300);

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Thang đo (scales)
    const x = d3.scaleBand()
              .domain(xValues)
              .range([0, width])
              .padding(0.1);

    const y = d3.scaleLinear()
                .domain([0, d3.max(yValues)])
                    .range([height, 0]);

        // Trục X và Y
    g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    g.append("g")
      .call(d3.axisLeft(y));

      // Thêm tiêu đề
    g.append("text")
    .attr("x", width / 2)
    .attr("y", margin.top / 100 ) // Đặt phía trên biểu đồ
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Phân bố TNGT theo giới tính");

    // Vẽ cột
    g.selectAll(".bar")
      .data(data_gender)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.Gender_1))
      .attr("y", d => y(d.Accidents))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.Accidents))
      .attr("fill", "steelblue");
      
  });
}

function renderSeverityChart() {
  // Lấy dữ liệu từ API
  fetch('http://localhost:8000/api/data_severity')
  .then(response => response.json())
  .then(data_severity => {
    const severityOrder = ["Không bị sao", "Thương nhẹ", "Thương nặng", "Tử vong"];
    data_severity.sort((a, b) => severityOrder.indexOf(a.Severity_1) - severityOrder.indexOf(b.Severity_1));
    // Chuyển dữ liệu thành dạng mà D3.js có thể sử dụng
    const xValues = data_severity.map(d => d.Severity_1); //    Cột x_value
    const yValues = data_severity.map(d => d.Accidents); //   Cột y_value

    // Thiết lập canvas
    const svg = d3.select('#severity-chart')
          .append('svg')
          .attr('width', 500)
          .attr('height', 300);

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Thang đo (scales)
    const x = d3.scaleBand()
              .domain(xValues)
              .range([0, width])
              .padding(0.1);

    const y = d3.scaleLinear()
                .domain([0, d3.max(yValues)])
                .range([height, 0]);

        // Trục X và Y
    g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    g.append("g")
      .call(d3.axisLeft(y));
    
    // Thêm tiêu đề
    g.append("text")
    .attr("x", width / 2)
    .attr("y", margin.top /1000 ) // Đặt phía trên biểu đồ
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Phân bố TNGT theo mức nghiêm trọng");

    // Vẽ cột
    g.selectAll(".bar")
      .data(data_severity)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.Severity_1))
      .attr("y", d => y(d.Accidents))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.Accidents))
      .attr("fill", "steelblue");
  });
}

function renderSeverityChart_Pie() {
  // Lấy dữ liệu từ API
  fetch('http://localhost:8000/api/data_severity')
  .then(response => response.json())
  .then(data_severity => {
    const severityOrder = ["Không bị sao", "Thương nhẹ", "Thương nặng", "Tử vong"];
    data_severity.sort((a, b) => severityOrder.indexOf(a.Severity_1) - severityOrder.indexOf(b.Severity_1));
    // Chuyển dữ liệu thành dạng mà D3.js có thể sử dụng
    const xValues = data_severity.map(d => d.Severity_1); //    Cột x_value
    const yValues = data_severity.map(d => d.Accidents); //   Cột y_value

    // Tính tổng và chuyển đổi thành phần trăm
    const total = d3.sum(data_severity, d => d.Accidents);
    const percentData = data_severity.map(d => ({
                          label: d.Severity_1,
                          value: (d.Accidents / total) * 100  }));

    
    
                          // Thiết lập canvas
    const svg = d3.select('#severity-chart')
                  .append('svg')
                  .attr('width', 500)
                  .attr('height',300)
    
    const margin = { top: 20, right: 20, bottom: 10, left: 20 };
    const width = svg.attr("width") - margin.right - margin.left
    const height = svg.attr("height") - margin.top - margin.bottom
    const radius = Math.min(width, height) / 2 -15 ;

    const g = svg.append('g').attr('transform', `translate(${svg.attr("width")/2-70}, ${svg.attr("height")/2 +15})`);// Di chuyển vào giữa SVG

    // Tạo một hàm layout cho pie chart
    const pie = d3.pie()
          .value(d => d.Accidents); // Lấy giá trị từ dữ liệu
    
    const arc = d3.arc()
        .innerRadius(0) // Biểu đồ tròn đầy đủ (không có lỗ ở giữa)
        .outerRadius(radius); // Đặt bán kính ngoài

    // Tạo các đoạn biểu đồ tròn
    const color = d3.scaleOrdinal()
        .domain(data_severity.map(d => d.Severity_1))
        //.range(d3.schemeCategory10);
        .range(["cyan", "orange", "steelblue","#999999"]); 

    const pieData = pie(data_severity);

    // Vẽ bieu do
    g.selectAll('path')
    .data(pieData)
    .enter()
    .append('path')
    .attr('d', arc) // Vẽ từng đoạn
    .attr('fill', (d,i) => color(i))
    .attr('class','slice')
    .attr('stroke', 'white') // Đường viền giữa các phần
    .attr('stroke-width', 2);

    
    g.selectAll('text')
    .data(pieData)
    .enter()
    .append('text')
    //.attr('transform', d => `translate(${arc.centroid(d)})`) // Đặt nhãn ở trung tâm mỗi arc
    .attr("transform", function(d) {
      const pos = arc.centroid(d); // Lấy vị trí trung tâm của phần lát
      pos[0] *= 1.2; // Di chuyển nhãn ra ngoài theo trục X
      pos[1] *= 1.0; // Di chuyển nhãn ra ngoài theo trục Y
      return `translate(${pos})`;
  })

    .attr('text-anchor', 'middle')
    .attr('dy', '0.2em')
    .attr('font-size', '14px')
    .attr('fill', 'black')
    .text((d,i) => `${(100*yValues[i]/total).toFixed(1)}${"%"}`); // Tính % và hiển thị
    //.text((d,i) => `${xValues[i]},${(100*yValues[i]/total).toFixed(1)}${"%"}`); // Tính % và hiển thị

    g.append("text")
    .attr("x", 0 )
    .attr("y", -radius-25 ) // Đặt phía trên biểu đồ
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Tỷ lệ TNGT theo mức nghiêm trọng");

     // Thêm legend bên cạnh biểu đồ
     const legend = svg.selectAll(".legend")
                  .data(data_severity.map(d => d.Severity_1))
                  .enter()
                  .append("g")
                  .attr("class", "legend")
                  .attr("transform", (d, i) => `translate(${radius + 225}, ${150 + i*25})`);

      // Hình chữ nhật trong legend
        legend.append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 15)
          .attr("height", 15)
          .attr("fill", (d,i) => color(i))
          // Văn bản trong legend
        legend.append("text")
        .attr("x", 20)
        .attr("y", 12) // Căn chỉnh văn bản theo chiều dọc
        .style("font-size", "12px")
        .text(d => d);
        

  });
}

function renderCauseChart() {
  // Lấy dữ liệu từ API
  fetch('http://localhost:8000/api/data_cause')
  .then(response => response.json())
  .then(data_cause=> {
    //const severityOrder = ["Không bị sao", "Thương nhẹ", "Thương nặng", "Tử vong"];
    //data_severity.sort((a, b) => severityOrder.indexOf(a.Severity_1) - severityOrder.indexOf(b.Severity_1));
    // Chuyển dữ liệu thành dạng mà D3.js có thể sử dụng
    const xValues = data_cause.map(d => d.Causes); //    Cột x_value
    const yValues = data_cause.map(d => d.Accidents); //   Cột y_value

    // Thiết lập canvas
    const svg = d3.select('#cause-chart')
          .append('svg')
          .attr('width', 500)
          .attr('height', 300);

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Thang đo (scales)
    const x = d3.scaleBand()
              .domain(xValues)
              .range([0, width])
              .padding(0.1);

    const y = d3.scaleLinear()
                .domain([0, d3.max(yValues)])
                .range([height, 0]);

        // Trục X và Y
    g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    g.append("g")
      .call(d3.axisLeft(y));
    
    // Thêm tiêu đề
    g.append("text")
    .attr("x", width / 2)
    .attr("y", margin.top /1000 ) // Đặt phía trên biểu đồ
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Phân bố TNGT theo nguyên nhân chính");

    // Vẽ cột
    g.selectAll(".bar")
      .data(data_cause)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.Causes))
      .attr("y", d => y(d.Accidents))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.Accidents))
      .attr("fill", "steelblue");
  });
}

function renderCauseChart_Pie() {
  // Lấy dữ liệu từ API
  fetch('http://localhost:8000/api/data_cause')
  .then(response => response.json())
  .then(data_cause=> {
    //const severityOrder = ["Không bị sao", "Thương nhẹ", "Thương nặng", "Tử vong"];
    //data_severity.sort((a, b) => severityOrder.indexOf(a.Severity_1) - severityOrder.indexOf(b.Severity_1));
    // Chuyển dữ liệu thành dạng mà D3.js có thể sử dụng
    const xValues = data_cause.map(d => d.Causes); //    Cột x_value
    const yValues = data_cause.map(d => d.Accidents); //   Cột y_value

    // Tính tổng và chuyển đổi thành phần trăm
    const total = d3.sum(data_cause, d => d.Accidents);
    const percentData = data_cause.map(d => ({
                          label: d.Causes,
                          value: (d.Accidents / total) * 100  }));

    // Thiết lập canvas
    const svg = d3.select('#cause-chart')
                  .append('svg')
                  .attr('width', 500)
                  .attr('height',300)
    
    const margin = { top: 20, right: 20, bottom: 10, left: 20 };
    const width = svg.attr("width") - margin.right - margin.left
    const height = svg.attr("height") - margin.top - margin.bottom
    const radius = Math.min(width, height) / 2 -15 ;

    const g = svg.append('g').attr('transform', `translate(${svg.attr("width")/2-100}, ${svg.attr("height")/2 +15})`);// Di chuyển vào giữa SVG

    // Tạo một hàm layout cho pie chart
    const pie = d3.pie()
          .value(d => d.Accidents); // Lấy giá trị từ dữ liệu
    
    const arc = d3.arc()
        .innerRadius(0) // Biểu đồ tròn đầy đủ (không có lỗ ở giữa)
        .outerRadius(radius); // Đặt bán kính ngoài

    // Tạo các đoạn biểu đồ tròn
    const color = d3.scaleOrdinal()
        .domain(data_cause.map(d => d.Causes))
        //.range(d3.schemeCategory10);
        .range(["cyan", "orange", "steelblue","#A52A2A","#FF00FF","#F0E68C","#9400D3","#FF7F50","#DEB887"]); 

    const pieData = pie(data_cause);

    // Vẽ bieu do
    g.selectAll('path')
    .data(pieData)
    .enter()
    .append('path')
    .attr('d', arc) // Vẽ từng đoạn
    .attr('fill', (d,i) => color(i))
    .attr('class','slice')
    .attr('stroke', 'white') // Đường viền giữa các phần
    .attr('stroke-width', 2);

    
    g.selectAll('text')
    .data(pieData)
    .enter()
    .append('text')
    //.attr('transform', d => `translate(${arc.centroid(d)})`) // Đặt nhãn ở trung tâm mỗi arc
    .attr("transform", function(d) {
      const pos = arc.centroid(d); // Lấy vị trí trung tâm của phần lát
      pos[0] *= 2.4; // Di chuyển nhãn ra ngoài theo trục X
      pos[1] *= 2.1; // Di chuyển nhãn ra ngoài theo trục Y
      return `translate(${pos})`;
  })
    //.attr("text-anchor", function(d) {   return (d.startAngle + d.endAngle) /2 > Math.PI ? "end" : "start"; // Căn chỉnh trái/phải})
    .attr('text-anchor', 'middle')
    .attr('dy', '0.2em')
    .attr('font-size', '14px')
    .attr('fill', 'black')
    .text((d,i) => `${(100*yValues[i]/total).toFixed(1)}${"%"}`); // Tính % và hiển thị
    //.text((d,i) => `${xValues[i]},${(100*yValues[i]/total).toFixed(1)}${"%"}`); // Tính % và hiển thị

  


    g.append("text")
    .attr("x", 0 )
    .attr("y", -radius-25 ) // Đặt phía trên biểu đồ
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Tỷ lệ TNGT theo nguyên nhân chính");

     // Thêm legend bên cạnh biểu đồ
     const legend = svg.selectAll(".legend")
                  .data(data_cause.map(d => d.Causes))
                  .enter()
                  .append("g")
                  .attr("class", "legend")
                  .attr("transform", (d, i) => `translate(${radius + 160}, ${70+ i*25})`);

      // Hình chữ nhật trong legend
        legend.append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 15)
          .attr("height", 15)
          .attr("fill", (d,i) => color(i))
          // Văn bản trong legend
        legend.append("text")
        .attr("x", 20)
        .attr("y", 12) // Căn chỉnh văn bản theo chiều dọc
        .style("font-size", "12px")
        .text(d => d);
        

  });
}

function renderRoadChart() {
  // Lấy dữ liệu từ API
  fetch('http://localhost:8000/api/data_cause')
  .then(response => response.json())
  .then(data_cause=> {
    //const severityOrder = ["Không bị sao", "Thương nhẹ", "Thương nặng", "Tử vong"];
    //data_severity.sort((a, b) => severityOrder.indexOf(a.Severity_1) - severityOrder.indexOf(b.Severity_1));
    // Chuyển dữ liệu thành dạng mà D3.js có thể sử dụng
    const xValues = data_cause.map(d => d.Causes); //    Cột x_value
    const yValues = data_cause.map(d => d.Accidents); //   Cột y_value

    // Thiết lập canvas
    const svg = d3.select('#road-chart')
          .append('svg')
          .attr('width', 500)
          .attr('height', 300);

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Thang đo (scales)
    const x = d3.scaleBand()
              .domain(xValues)
              .range([0, width])
              .padding(0.1);

    const y = d3.scaleLinear()
                .domain([0, d3.max(yValues)])
                .range([height, 0]);

        // Trục X và Y
    g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    g.append("g")
      .call(d3.axisLeft(y));
    
    // Thêm tiêu đề
    g.append("text")
    .attr("x", width / 2)
    .attr("y", margin.top /1000 ) // Đặt phía trên biểu đồ
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Phân bố TNGT theo loại đường");

    // Vẽ cột
    g.selectAll(".bar")
      .data(data_cause)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.Causes))
      .attr("y", d => y(d.Accidents))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.Accidents))
      .attr("fill", "steelblue");
  });
}

function renderRoadChart_Pie() {
  // Lấy dữ liệu từ API
  fetch('http://localhost:8000/api/data_road')
  .then(response => response.json())
  .then(data_road=> {
    //const severityOrder = ["Không bị sao", "Thương nhẹ", "Thương nặng", "Tử vong"];
    //data_severity.sort((a, b) => severityOrder.indexOf(a.Severity_1) - severityOrder.indexOf(b.Severity_1));
    // Chuyển dữ liệu thành dạng mà D3.js có thể sử dụng
    const xValues = data_road.map(d => d.Rdtype); //    Cột x_value
    const yValues = data_road.map(d => d.Accidents); //   Cột y_value

    // Tính tổng và chuyển đổi thành phần trăm
    const total = d3.sum(data_road, d => d.Accidents);
    const percentData = data_road.map(d => ({
                          label: d.Rdtype,
                          value: (d.Accidents / total) * 100  }));

    // Thiết lập canvas
    const svg = d3.select('#road-chart')
                  .append('svg')
                  .attr('width', 500)
                  .attr('height',300)
    
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const width = svg.attr("width") - margin.right - margin.left
    const height = svg.attr("height") - margin.top - margin.bottom
    const radius = Math.min(width, height) / 2 -15;

    const g = svg.append('g').attr('transform', `translate(${svg.attr("width")/2-100}, ${svg.attr("height")/2+15})`);// Di chuyển vào giữa SVG

    // Tạo một hàm layout cho pie chart
    const pie = d3.pie()
          .value(d => d.Accidents); // Lấy giá trị từ dữ liệu
    
    const arc = d3.arc()
        .innerRadius(0) // Biểu đồ tròn đầy đủ (không có lỗ ở giữa)
        .outerRadius(radius); // Đặt bán kính ngoài

    // Tạo các đoạn biểu đồ tròn
    const color = d3.scaleOrdinal()
        .domain(data_road.map(d => d.Rdtype))
        //.range(d3.schemeCategory10);
        .range(["cyan", "orange", "steelblue","#A52A2A","#FF00FF","#F0E68C","#9400D3","#FF7F50","#DEB887"]); 

    const pieData = pie(data_road);

    // Vẽ bieu do
    g.selectAll('path')
    .data(pieData)
    .enter()
    .append('path')
    .attr('d', arc) // Vẽ từng đoạn
    .attr('fill', (d,i) => color(i))
    .attr('class','slice')
    .attr('stroke', 'white') // Đường viền giữa các phần
    .attr('stroke-width', 2);

    
    g.selectAll('text')
    .data(pieData)
    .enter()
    .append('text')
    //.attr('transform', d => `translate(${arc.centroid(d)})`) // Đặt nhãn ở trung tâm mỗi arc
    .attr("transform", function(d) {
      const pos = arc.centroid(d); // Lấy vị trí trung tâm của phần lát
      pos[0] *= 2.3; // Di chuyển nhãn ra ngoài theo trục X
      pos[1] *= 2.1; // Di chuyển nhãn ra ngoài theo trục Y
      return `translate(${pos})`;
  })

    .attr('text-anchor', 'middle')
    .attr('dy', '0.2em')
    .attr('font-size', '14px')
    .attr('fill', 'black')
    .text((d,i) => `${(100*yValues[i]/total).toFixed(1)}${"%"}`); // Tính % và hiển thị
    //.text((d,i) => `${xValues[i]},${(100*yValues[i]/total).toFixed(1)}${"%"}`); // Tính % và hiển thị

    g.append("text")
    .attr("x", 0 )
    .attr("y", -radius-25 ) // Đặt phía trên biểu đồ
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Tỷ lệ TNGT theo loại đường");

     // Thêm legend bên cạnh biểu đồ
     const legend = svg.selectAll(".legend")
                  .data(data_road.map(d => d.Rdtype))
                  .enter()
                  .append("g")
                  .attr("class", "legend")
                  .attr("transform", (d, i) => `translate(${radius + 200}, ${75+ i*25})`);

      // Hình chữ nhật trong legend
        legend.append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 15)
          .attr("height", 15)
          .attr("fill", (d,i) => color(i))
          // Văn bản trong legend
        legend.append("text")
        .attr("x", 20)
        .attr("y", 12) // Căn chỉnh văn bản theo chiều dọc
        .style("font-size", "12px")
        .text(d => d);


  });
}

