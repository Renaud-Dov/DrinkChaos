import express, {Request, Response} from "express";

const router = express.Router();
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDocument = YAML.load('./docs/swagger.yaml');


router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument, {customSiteTitle: 'API Documentation'}));
router.get('/swagger.json', (req: Request, res: Response) => {
    // console.log(swaggerDocument)
    res.contentType('application/json');
    res.send(swaggerDocument);
});
router.use('/swagger.yaml', express.static('docs/swagger.yaml'));

module.exports = router;