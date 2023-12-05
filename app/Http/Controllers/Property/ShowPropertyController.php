<?php

namespace App\Http\Controllers\Property;

use App\Http\Controllers\Controller;
use App\Http\Requests\Property\ShowPropertyRequest;
use App\Http\Resources\PropertyResource;
use App\Models\Property;

class ShowPropertyController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(ShowPropertyRequest $request, Property $property)
    {
        $this->authorize('view', $property);

        return new PropertyResource($property);
    }
}
