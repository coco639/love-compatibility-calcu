import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    person1: {
      name: '',
      birthdate: '',
      gender: ''
    },
    person2: {
      name: '',
      birthdate: '',
      gender: ''
    }
  });

  const [result, setResult] = useState(null);

  const calculateCompatibility = (person1, person2) => {
    let score = 100;
    let details = [];

    // 1. 检查是否所有字段都已填写
    if (!person1.name || !person1.birthdate || !person1.gender ||
        !person2.name || !person2.birthdate || !person2.gender) {
      return null;
    }

    // 2. 计算年龄差异
    const date1 = new Date(person1.birthdate);
    const date2 = new Date(person2.birthdate);
    const ageDiff = Math.abs(date1 - date2) / (1000 * 60 * 60 * 24 * 365);
    
    if (ageDiff > 10) {
      score -= 10;
      details.push('年龄差距较大，可能会有代沟 (-10分)');
    } else if (ageDiff > 5) {
      score -= 5;
      details.push('年龄差距适中，有一定共同话题 (-5分)');
    } else {
      score += 10;
      details.push('年龄相近，容易产生共鸣 (+10分)');
    }

    // 3. 性别组合评估
    if (person1.gender === person2.gender) {
      score -= 0; // 保持中立
      details.push('同性组合，需要更多社会包容');
    } else {
      score += 5;
      details.push('异性组合，符合传统期望 (+5分)');
    }

    // 4. 姓名契合度（简单示例）
    if (person1.name.length === person2.name.length) {
      score += 5;
      details.push('姓名长度相同，暗合命理 (+5分)');
    }

    // 5. 生日星座分析
    const getZodiacSign = (date) => {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      
      if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "白羊座";
      if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "金牛座";
      if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) return "双子座";
      if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return "巨蟹座";
      if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "狮子座";
      if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "处女座";
      if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) return "天秤座";
      if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) return "天蝎座";
      if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) return "射手座";
      if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "摩羯座";
      if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "水瓶座";
      if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "双鱼座";
      
      return "未知星座";
    };

    const getZodiacCompatibility = (sign1, sign2) => {
      const zodiacGroups = {
        fire: ["白羊座", "狮子座", "射手座"],
        earth: ["金牛座", "处女座", "摩羯座"],
        air: ["双子座", "天秤座", "水瓶座"],
        water: ["巨蟹座", "天蝎座", "双鱼座"]
      };
    
      const getElement = (sign) => {
        for (let element in zodiacGroups) {
          if (zodiacGroups[element].includes(sign)) return element;
        }
        return null;
      };
    
      const element1 = getElement(sign1);
      const element2 = getElement(sign2);
    
      const specialPairs = {
        "白羊座": ["天秤座", "狮子座"],
        "金牛座": ["天蝎座", "处女座"],
        "双子座": ["射手座", "天秤座"],
        "巨蟹座": ["摩羯座", "天蝎座"],
        "狮子座": ["水瓶座", "白羊座"],
        "处女座": ["双鱼座", "金牛座"],
        "天秤座": ["白羊座", "双子座"],
        "天蝎座": ["金牛座", "巨蟹座"],
        "射手座": ["双子座", "白羊座"],
        "摩羯座": ["巨蟹座", "金牛座"],
        "水瓶座": ["狮子座", "天秤座"],
        "双鱼座": ["处女座", "天蝎座"]
      };
    
      if (sign1 === sign2) {
        return { score: 15, message: `同星座，性格特征高度相似，但可能缺乏互补 (+15分)` };
      }
    
      if (specialPairs[sign1]?.includes(sign2)) {
        return { score: 20, message: `${sign1}和${sign2}是天作之合 (+20分)` };
      }
    
      if (element1 === element2) {
        return { score: 15, message: `同为${element1}象星座，性格相似，容易产生共鸣 (+15分)` };
      }
    
      if (
        (element1 === "fire" && element2 === "air") ||
        (element1 === "air" && element2 === "fire") ||
        (element1 === "earth" && element2 === "water") ||
        (element1 === "water" && element2 === "earth")
      ) {
        return { score: 10, message: "星座五行相生，能够互补 (+10分)" };
      }
    
      return { score: 5, message: "星座相性一般，需要多沟通理解 (+5分)" };
    };

    const sign1 = getZodiacSign(date1);
    const sign2 = getZodiacSign(date2);
    const zodiacResult = getZodiacCompatibility(sign1, sign2);
    score += zodiacResult.score;
    details.push(`${sign1}和${sign2}：${zodiacResult.message}`);
    

    // 6. 根据分数给出建议
    let recommendation = '';
    if (score >= 90) {
      recommendation = '天生一对！你们的缘分非常深厚。';
    } else if (score >= 70) {
      recommendation = '很不错的组合，彼此都要珍惜。';
    } else if (score >= 50) {
      recommendation = '还算般配，需要互相理解和包容。';
    } else {
      recommendation = '可能需要更多努力来维系感情。';
    }

    return {
      score,
      details,
      recommendation
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const compatibilityResult = calculateCompatibility(formData.person1, formData.person2);
    setResult(compatibilityResult);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>💘 AI 恋爱契合度测试 💘</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <div className="person-form">
              <h2>第一个人的信息</h2>
              <input
                type="text"
                placeholder="姓名"
                value={formData.person1.name}
                onChange={(e) => setFormData({
                  ...formData,
                  person1: { ...formData.person1, name: e.target.value }
                })}
              />
              <input
                type="date"
                value={formData.person1.birthdate}
                onChange={(e) => setFormData({
                  ...formData,
                  person1: { ...formData.person1, birthdate: e.target.value }
                })}
              />
              <select
                value={formData.person1.gender}
                onChange={(e) => setFormData({
                  ...formData,
                  person1: { ...formData.person1, gender: e.target.value }
                })}
              >
                <option value="">选择性别</option>
                <option value="male">男</option>
                <option value="female">女</option>
              </select>
            </div>

            <div className="person-form">
              <h2>第二个人的信息</h2>
              <input
                type="text"
                placeholder="姓名"
                value={formData.person2.name}
                onChange={(e) => setFormData({
                  ...formData,
                  person2: { ...formData.person2, name: e.target.value }
                })}
              />
              <input
                type="date"
                value={formData.person2.birthdate}
                onChange={(e) => setFormData({
                  ...formData,
                  person2: { ...formData.person2, birthdate: e.target.value }
                })}
              />
              <select
                value={formData.person2.gender}
                onChange={(e) => setFormData({
                  ...formData,
                  person2: { ...formData.person2, gender: e.target.value }
                })}
              >
                <option value="">选择性别</option>
                <option value="male">男</option>
                <option value="female">女</option>
              </select>
            </div>
          </div>
          <button type="submit">开始测试</button>
        </form>

        {result && (
          <div className="result-container">
            <h2>测试结果</h2>
            <div className="score">
              契合度得分：{result.score}分
            </div>
            <div className="details">
              <h3>详细分析：</h3>
              <ul>
                {result.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
            <div className="recommendation">
              <h3>AI建议：</h3>
              <p>{result.recommendation}</p>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

