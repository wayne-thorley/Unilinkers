<?php

namespace App\Http\Controllers\Property;

use App\Http\Controllers\Controller;
use App\Http\Requests\Property\ListPropertyRequest;
use App\Http\Resources\PropertyResource;
use App\Models\Property;

class ListPropertyController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(ListPropertyRequest $request)
    {
        $this->authorize('viewAny', Property::class);

        $properties = Property::paginate(20);

        return PropertyResource::collection($properties);
    }
}
