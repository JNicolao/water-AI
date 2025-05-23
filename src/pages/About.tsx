import React from 'react';
import { motion } from 'framer-motion';
import { Droplet, Brain, LineChart, Rocket } from 'lucide-react';

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants} className="card">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-3/5">
            <h2 className="text-2xl font-bold mb-4">About This Project</h2>
            <p className="mb-4">
              This Water Resource Management AI project demonstrates how artificial intelligence and data science can address critical water management challenges in Africa. By combining real-time monitoring, predictive analytics, and AI-driven insights, the system provides a comprehensive solution for water management authorities.
            </p>
            <p className="mb-4">
              The project was created as a submission for the ALX Software Engineering Programme Build your Portfolio project, showcasing technical skills, problem-solving abilities, and an ability to apply AI to solve real-world problems.
            </p>
          </div>
          
          <div className="md:w-2/5">
            <div className="rounded-lg overflow-hidden h-full">
              <img 
                src="https://images.pexels.com/photos/6211144/pexels-photo-6211144.jpeg" 
                alt="Water management" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-semibold mb-4">Key Features</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card flex">
            <div className="mr-4 bg-primary/10 p-3 rounded-lg text-primary h-fit">
              <Droplet size={24} />
            </div>
            <div>
              <h4 className="font-medium mb-2">Water Quality Monitoring</h4>
              <p className="text-sm text-neutral-600">
                Real-time monitoring of critical water quality parameters including pH, dissolved oxygen, turbidity, and harmful contaminants. The system provides immediate alerts when parameters exceed safe thresholds.
              </p>
            </div>
          </div>
          
          <div className="card flex">
            <div className="mr-4 bg-secondary/10 p-3 rounded-lg text-secondary h-fit">
              <Brain size={24} />
            </div>
            <div>
              <h4 className="font-medium mb-2">AI-Powered Predictions</h4>
              <p className="text-sm text-neutral-600">
                Advanced machine learning algorithms analyze historical data and current conditions to predict water levels, quality trends, and potential supply issues up to 7 days in advance with high accuracy.
              </p>
            </div>
          </div>
          
          <div className="card flex">
            <div className="mr-4 bg-accent/10 p-3 rounded-lg text-accent h-fit">
              <LineChart size={24} />
            </div>
            <div>
              <h4 className="font-medium mb-2">Comprehensive Analytics</h4>
              <p className="text-sm text-neutral-600">
                Interactive dashboards visualize complex water data, making it accessible to both technical experts and non-technical stakeholders for informed decision-making.
              </p>
            </div>
          </div>
          
          <div className="card flex">
            <div className="mr-4 bg-success/10 p-3 rounded-lg text-success h-fit">
              <Rocket size={24} />
            </div>
            <div>
              <h4 className="font-medium mb-2">Scalable Architecture</h4>
              <p className="text-sm text-neutral-600">
                Built on modern web technologies with a scalable architecture that can grow from monitoring a few locations to managing entire regional water systems.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="card">
        <h3 className="text-xl font-semibold mb-4">Technical Implementation</h3>
        
        <div className="space-y-6">
          <p>
            This project demonstrates the application of several technical skills and technologies:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Front-End Technologies</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  <span>React with TypeScript for type safety</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  <span>Tailwind CSS for responsive design</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  <span>Recharts for interactive data visualization</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  <span>Framer Motion for smooth animations</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Back-End Components (Described)</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                  <span>Python for data processing and ML models</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                  <span>TensorFlow/PyTorch for predictive models</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                  <span>Flask/FastAPI for RESTful services</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                  <span>PostgreSQL for data storage</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Machine Learning Approaches</h4>
            <p className="text-sm mb-3">
              The predictive models in this system would combine several AI techniques:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-accent rounded-full mr-2 mt-1.5"></span>
                <span>LSTM neural networks for time series forecasting of water levels and quality parameters</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-accent rounded-full mr-2 mt-1.5"></span>
                <span>Gradient boosting for anomaly detection to identify potential contamination or equipment failures</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-accent rounded-full mr-2 mt-1.5"></span>
                <span>Ensemble methods to combine multiple models and improve prediction accuracy</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-accent rounded-full mr-2 mt-1.5"></span>
                <span>Physics-informed neural networks that incorporate hydrological principles into machine learning models</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;