import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHospital, FaLocationDot } from "react-icons/fa6";
import Dropdown from 'react-bootstrap/Dropdown';
import fetchHealthCenters from '../utils/fetchHealthCenters';
import exportToCSV from '../utils/exportToCSV';
import EmailShareButton from './EmailShareButton';
import LinkShareButton from './LinkShareButton';
import './medfind.css';

const categories = [
  "Community Health Center", "Comprehensive Health Center", "Cottage Hospital",
  "Dispensary", "District Hospital", "Educational Clinic", "Federal Medical Center",
  "Federal Staff Clinic", "General Hospital", "Laboratory", "Maternity Home",
  "Medical Center", "Military and Paramilitary Clinic", "Pharmacy",
  "Primary Health Center", "Private Non-Profit", "Research Hospital", "Specialist Hospital",
  "Teaching Hospital", "Veterinary Clinic", "Others"
];

const states = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo",
  "Jigawa", "Kaduna", "Kano", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun",
  "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const SearchHealthCenters: React.FC = () => {
  const [healthCenters, setHealthCenters] = useState<any[]>([]);
  const [searchName, setSearchName] = useState('');
  const [category, setCategory] = useState('');
  const [state, setState] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 30;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialSearchName = params.get('searchName') || '';
    const initialCategory = params.get('category') || '';
    const initialState = params.get('state') || '';

    setSearchName(initialSearchName);
    setCategory(initialCategory);
    setState(initialState);
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHealthCenters();
        setHealthCenters(data);
      } catch (error) {
        console.error('Error fetching health centers:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = healthCenters.filter(center =>
      (searchName ? center.name.toLowerCase().includes(searchName.toLowerCase()) : true) &&
      (category ? center.category === category : true) &&
      (state ? center.address.includes(state) : true)
    );
    setResults(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchName, category, state, healthCenters]);

  const paginatedResults = results.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage);
  const totalPages = Math.ceil(results.length / resultsPerPage);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleExport = () => {
    if (!results || results.length === 0) {
      alert('You can not export empty results to CSV');
      return;
    }
    exportToCSV(results, 'health_centers.csv');
  }

  const handleSearch = () => {
    const query = new URLSearchParams({ searchName, category, state });
    navigate({ search: query.toString() });
  };

  return (
    <div>
      <div className='search-div1'>
        <h1>Find the Best Health Centers for Your Needs</h1>
        <p>Discover and explore health facilities across Nigeria with ease. Search by name, category, or state to find the best healthcare options available to you.</p>
      </div>
      <div id='search-div2'>
        <Dropdown>
          <Dropdown.Toggle variant="success" className='search-div3'>State</Dropdown.Toggle>
          <Dropdown.Menu className="custom-dropdown-menu">
            {states.map((s) => (
              <Dropdown.Item key={s} onClick={() => setState(s)}>{s}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="success" className='search-div4'>Category</Dropdown.Toggle>
          <Dropdown.Menu className="custom-dropdown-menu">
            {categories.map((cat) => (
              <Dropdown.Item key={cat} onClick={() => setCategory(cat)}>{cat}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <div className='input-search'>
          <input
            type="text"
            placeholder="Search by Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className='search-input'
          />
          <button onClick={handleSearch} className='search-btn'>Search</button>
        </div>
      </div>

      <div className='d-flex flex-wrap align-items-center justify-content-between hc-container'>
        {paginatedResults.map((center, index) => (
          <div key={index} className='hc-card'>
            <h3>{center.name}</h3>
            <p>{FaHospital({})} {center.category}</p>
            <p>{FaLocationDot({})} {center.address}</p>
          </div>
        ))}
      </div>

      {results.length > 0 && (
        <div className='d-flex flex-column align-items-center justify-content-center page'>
          <p>Showing page {currentPage} out of {totalPages}</p>
          <div className='d-flex flex-row align-items-center justify-content-center page-btn'>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}

      <button onClick={handleExport} className='btn-function'>Export to CSV</button>
      <EmailShareButton results={results} />
      <LinkShareButton searchParams={{ searchName, category, state }} />
    </div>
  );
};

export default SearchHealthCenters;
