import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

import firebase from '../firebase';


const Dashboard = (props) => {
  const [recommendations, setRecommendations] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [authors, setAuthors] = useState({});

  useEffect(() => {
    let tempAuthors = {};
    /*
    [{uid.username}]
    {uid:username, uid:username}
    create a dictionary to eliminate looping twice
    author[review.data.author]
    */
    firebase.getAuthors().then(results => {
      results.forEach(doc => {
        tempAuthors[doc.data().uid] = doc.data().username;
      });

      setAuthors(tempAuthors);

      firebase.getRecommendations().then(recommendations => {
        let newReviews = [];
        recommendations.forEach(recommendation => {
          newReviews.push({
            id: recommendation.id,
            data: recommendation.data().recommendation
          });
        });
        setRecommendations(newReviews);
        setLoading(false);
      });

    })

    firebase.addAuthor();
  }, [loading]);

  if (!firebase.getCurrentUsername()) {
    alert('Please login first');
    props.history.replace('/login');
    return null;
  }

  async function addRecommendation() {
    try {
      await firebase.addRecommendation({
        title,
        category,
        recommendation,
        author: firebase.auth.currentUser.uid
      });
      setCategory('');
      setTitle('');
      setRecommendation('');
      setLoading('');

    } catch (error) {
      alert(error.message);
    }
  }

  async function deleteRecommendation(e, id) {
    e.preventDefault();
    await firebase.deleteRecommendation(id);
    setLoading(true);
  }

  return (
    <main>
      <Navbar {...props} />
      <div className="container">
        <h2>Hello! {firebase.getCurrentUsername()} - Dashboard</h2>

        <p>Current recommendations {recommendations.length}</p>
        <div className="tile">
          {recommendations.map((recommendation, index) => (
            <div key={index} className="card">
              <header className="card-header">
                <p className="card-header-title">{recommendation.data.title}</p>
              </header>
              <div className="card-content">
                <div className="content">
                  {recommendation.data.recommendation}
                </div>
              </div>
              <footer className="card-footer">
                <a
                  href={`/category/${recommendation.data.category}`}
                  className="card-footer-item"
                >
                  {recommendation.data.category}
                </a>
                <a
                  href={`/author/${recommendation.data.author}`}
                  className="card-footer-item"
                >
                  {authors[recommendation.data.author]}
                </a>
                {(firebase.auth.currentUser.uid == recommendation.data.author) ? (
                  <a
                    href='/deleteRecommendation'
                    className="card-footer-item"
                    onClick={e => deleteRecommendation(e, recommendation.id)}
                  >
                    Delete
                </a>
                ) : (
                    ''
                  )}
              </footer>
            </div>
          ))}
        </div>

        <h3>Add recommendation</h3>
        <form onSubmit={e => e.preventDefault() && false}>
          <div>
            <input
              placeholder="title"
              type="text"
              value={title}
              aria-label="title"
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="category"
              type="text"
              value={category}
              aria-label="category"
              onChange={e => setCategory(e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="recommendation"
              type="text"
              value={recommendation}
              aria-label="recommendation"
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="button"
            onClick={addRecommendation}
          >
            Add recommendation
            </button>
        </form>
      </div>
    </main>
  );
};

export default Dashboard;