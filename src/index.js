const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
    origin: '*'
}));

app.use('/content', require('./routes/content.routes'));
app.use('/upload', require('./routes/upload.routes'));
app.use('/mkdir', require('./routes/mkdir.routes'));

app.listen(app.get('port'), () => {
    console.log('Server is running on port ' + app.get('port'));
});
