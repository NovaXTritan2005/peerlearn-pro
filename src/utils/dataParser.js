/**
 * Data parsers for HTML files using DOMParser
 * Robust against weird whitespace, <br>, and nested tags
 */

/**
 * @typedef {Object} LeaderboardItem
 * @property {string} bank
 * @property {number} score
 */

/**
 * @typedef {Object} ReportRow
 * @property {number} id
 * @property {string} bank
 * @property {number} year
 * @property {number} risk
 * @property {string} confidence
 * @property {number} presence
 * @property {string} href
 */

/**
 * @typedef {Object} IndexData
 * @property {LeaderboardItem[]} leaderboard
 * @property {ReportRow[]} rows
 */

/**
 * Parse the index.html data file
 * @param {string} html - The HTML content to parse
 * @returns {IndexData} Parsed data structure
 */
export function parseIndexHtml(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Parse leaderboard pills
  const leaderboard = [];
  const pills = doc.querySelectorAll('.pill');
  
  pills.forEach(pill => {
    const bankAttr = pill.getAttribute('data-bank');
    const scoreAttr = pill.getAttribute('data-score');
    
    if (bankAttr && scoreAttr) {
      leaderboard.push({
        bank: bankAttr.trim(),
        score: parseFloat(scoreAttr)
      });
    }
  });

  // Parse reports table
  const rows = [];
  const tableRows = doc.querySelectorAll('.reports-table tbody tr');
  
  tableRows.forEach(row => {
    const cells = row.querySelectorAll('td');
    if (cells.length >= 7) {
      const id = parseInt(cells[0].textContent?.trim() || '0');
      const bank = cells[1].textContent?.trim() || '';
      const year = parseInt(cells[2].textContent?.trim() || '0');
      const risk = parseFloat(cells[3].textContent?.trim() || '0');
      const confidence = cells[4].textContent?.trim() || '';
      const presence = parseFloat(cells[5].textContent?.trim() || '0');
      const link = cells[6].querySelector('a');
      const href = link?.getAttribute('href') || '';

      rows.push({
        id,
        bank,
        year,
        risk,
        confidence,
        presence,
        href
      });
    }
  });

  return { leaderboard, rows };
}

/**
 * @typedef {Object} RankingRow
 * @property {string} bank
 * @property {number} riskScore
 * @property {string} presenceRate
 * @property {string} avgConfidence
 * @property {string} mechanisms
 * @property {string} effects
 */

/**
 * @typedef {Object} ExampleItem
 * @property {string} bank
 * @property {string} mechanism
 * @property {string} note
 * @property {string} excerpt
 */

/**
 * @typedef {Object} DashboardData
 * @property {RankingRow[]} rankings
 * @property {ExampleItem[]} examples
 */

/**
 * Parse the dashboard.html data file
 * @param {string} html - The HTML content to parse
 * @returns {DashboardData} Parsed data structure
 */
export function parseDashboardHtml(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Parse rankings table
  const rankings = [];
  const rankingRows = doc.querySelectorAll('.rankings-table tbody tr');
  
  rankingRows.forEach(row => {
    const cells = row.querySelectorAll('td');
    if (cells.length >= 6) {
      const bank = cells[0].textContent?.trim() || '';
      const riskScore = parseFloat(cells[1].textContent?.trim() || '0');
      const presenceRate = cells[2].textContent?.trim() || '';
      const avgConfidence = cells[3].textContent?.trim() || '';
      const mechanisms = cells[4].textContent?.trim() || '';
      const effects = cells[5].textContent?.trim() || '';

      rankings.push({
        bank,
        riskScore,
        presenceRate,
        avgConfidence,
        mechanisms,
        effects
      });
    }
  });

  // Parse contextual examples
  const examples = [];
  const exampleItems = doc.querySelectorAll('.example');
  
  exampleItems.forEach(item => {
    const bankHeader = item.querySelector('h3');
    const mechanismP = item.querySelector('p:nth-child(2)');
    const noteP = item.querySelector('p:nth-child(3)');
    const excerptP = item.querySelector('p:nth-child(4)');

    if (bankHeader && mechanismP && noteP && excerptP) {
      const bank = bankHeader.textContent?.trim() || '';
      const mechanism = mechanismP.textContent?.replace('Mechanism:', '').trim() || '';
      const note = noteP.textContent?.replace('Micro-reason:', '').trim() || '';
      const excerpt = excerptP.textContent?.replace('Excerpt:', '').trim() || '';

      examples.push({
        bank,
        mechanism,
        note,
        excerpt
      });
    }
  });

  return { rankings, examples };
}