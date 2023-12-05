<?php

namespace App\Http\Controllers\Property;

use App\Http\Controllers\Controller;
use App\Http\Requests\Property\StorePropertyRequest;
use App\Http\Resources\PropertyResource;
use App\Models\Property;
use Illuminate\Http\JsonResponse;

class StorePropertyController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StorePropertyRequest $request)
    {
        $this->authorize('create', Property::class);

        $property = Property::create($request->only([
            'name',
            'address',
        ]));

        return new PropertyResource($property);
    }
}
